'use server'
import { auth } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"
import { registerFormSchema, submitFormSchema } from "./schema"
import { z } from "zod"
import { evaluateTaskSubmissionsByAI } from "@/ai/controllers"
import { updateStreak, getStreakInfo } from "@/utils/streaks"
import { submissionLimit } from "@/utils/rate-limiter"
import { uploadBinaryFile, registerUploadInLinkedin, publishLinkedinPostWithImage } from "@/utils/share-on-linkedin"
import { getChallengesInfoById, insertChallengeRegistration } from "@/lib/dal/challenge"
import { getUserStatsById, insertUser, updateUserById } from "@/lib/dal/user"
import { getUserCred } from "@/lib/dal/creds"
import { getSubmissionInfoById, insertSubmission, updateSubmissionById } from "@/lib/dal/submission"
import { redirect } from "next/navigation"
import { isRegistered } from "@/utils/auth"
import { genrateSignature } from "@/utils/cloud-storage"

const clerk = await clerkClient()

export async function createUser(formData, userLocalTimeZone) {

    const { sessionClaims, userId } = await auth()
    if (!userId) return redirect("/auth/login")

    try {

        const { success, error: inputError } = registerFormSchema.safeParse(formData)

        if (!success) {
            const formFieldErrors = z.flattenError(inputError).fieldErrors

            return {
                error: {
                    name: formFieldErrors.name[0],
                    username: formFieldErrors.username[0],
                    year: formFieldErrors.year[0],
                    branch: formFieldErrors.year[0],
                },
                message: "Invalid input!!"
            }
        }


        const { avatar_url, id } = sessionClaims
        const user = { ...formData, avatar_url, id, points: 0 }
        const { error } = await insertUser(user)
        if (error) {
            if (error.code == "23505") {
                return {
                    error: {
                        username: "Username must be unique!!",
                    },
                    message: "Username already exist!!"
                }
            } else {
                throw new Error(error.message)
            }
        }
        const updateUsernameRes = await clerk.users.updateUser(userId, {
            username: formData?.username,
        })
        const updateMetadataRes = await clerk.users.updateUserMetadata(userId, {
            publicMetadata: { status: "registered", localTZ: userLocalTimeZone },
        })
        return { message: "User is registered successfully!!" }
    } catch (error) {
        console.error("Error:\n", error)
        return { error: true, message: "Registration failed!!" }
    }
}

export async function evaluateSubmission(formData, task, submissionId) {

    const { userId, status, redirectToRegister } = await isRegistered()
    if (!status) return redirectToRegister()

    try {

        const { data: challenge, error: challengeError } = await getChallengesInfoById(task.challengeId)
        if (challengeError) throw new Error(challengeError.message)

        const { url, description } = formData;

        // evaluate submission using ai
        const currentState = {
            taskTitle: task.title,
            taskDescription: task.description,
            challengeTitle: challenge.title,
            challengeDescription: challenge.description,
            imageUrl: url,
            description: description,
        }

        const finalState = await evaluateTaskSubmissionsByAI(currentState);

        if (finalState.score < 6) {
            return { message: "Your submission is rejected!!", feedback: finalState.feedback, rejected: "content-quality" }
        }

        // get user informations
        const { data: userInfo, error: getUserInfoError } = await getUserStatsById(userId, true)

        if (getUserInfoError) throw new Error(getUserInfoError.message);

        // calculate users streaks and points
        let newUserInfo = updateStreak(userInfo);
        newUserInfo.points = userInfo.points ? userInfo.points + finalState.score : finalState.score;

        if (newUserInfo.streak_count == 1 && userInfo.streakCount > 0) newUserInfo.points -= 50;

        const streakUpdateInfo = getStreakInfo(newUserInfo.streak_count)
        newUserInfo.points += streakUpdateInfo.bonusPoints

        newUserInfo.daily_task_completed_count = userInfo.dailyTaskCompletedCount + 1;


        // update submission in posts table
        const taskSubmission = {
            image_url: url,
            ai_score: finalState.score,
        }

        const { error: updateSubmissionError } = await updateSubmissionById(submissionId, taskSubmission)
        if (updateSubmissionError) throw new Error(updateSubmissionError.message);


        // update users streaks and points
        const { error: updateUserPointsError } = await updateUserById(userId, newUserInfo)
        if (updateUserPointsError) throw new Error(updateUserPointsError.message);

        return { message: "Submit successfully!!", score: finalState.score, streak: newUserInfo.streak_count && streakUpdateInfo, feedback: finalState.feedback }
    } catch (error) {
        console.error("Error:\n", error)
        return { message: "Please try again later!!", error: true }
    }
}

export async function createSubmission(formData, task) {

    const { userId, status, redirectToRegister } = await isRegistered()
    if (!status) return redirectToRegister()

    try {

        try {
            const { success } = await submissionLimit.limit(userId)

            if (!success) {
                return { message: "You can't submit more than 3 time in a day!!", error: true }
            }
        } catch (error) {
            console.warn("Rate Limit Skipped:\n", error)
        }

        // verify form data
        const { success: formVerified, error: formError } = submitFormSchema.safeParse(formData)

        if (!formVerified) {
            const formFieldErrors = z.flattenError(formError).fieldErrors

            return {
                error: {
                    description: formFieldErrors.description?.shift(),
                    imageFile: formFieldErrors.imageFile?.shift(),
                },
                message: "Invalid input!!"
            }
        }

        // insert submission in posts table
        const taskSubmission = {
            task_id: task.id,
            challenge_id: task.challengeId,
            user_id: userId,
            text: formData.description,
        }

        const { data: submissionId, error: insertSubmissionError } = await insertSubmission(taskSubmission)
        if (insertSubmissionError) throw new Error(insertSubmissionError.message);

        const { uploadConfig } = await genrateSignature()

        return { submissionId, uploadConfig }
    } catch (error) {
        console.error("Error:\n", error)
        return { message: "Please try again later!!", error: true }
    }
}

export async function registerForChallenge(challengeId) {

    const { userId, status, redirectToRegister } = await isRegistered()
    if (!status) return redirectToRegister()

    try {
        const { error: insertFailError } = await insertChallengeRegistration(userId, challengeId)
        if (insertFailError) {
            throw new Error(insertFailError.message)
        }
        return {
            message: "Your challenge is started now!!"
        }
    } catch (error) {
        console.error(error)
        return {
            error: true,
            message: "Please try again later!!"
        }
    }
}


export async function shareOnLinkedIn(submissionId) {

    const { status, redirectToRegister } = await isRegistered()
    if (!status) return redirectToRegister()

    try {

        const { data: userCreds, error: userCredsError } = await getUserCred()

        if (userCredsError) {
            throw new Error(userCredsError.message);
        }

        // TODO: Check if access_token is expired
        const createdDate = new Date(userCreds.createdAt);
        const expireDate = new Date(createdDate.getTime() + userCreds.expiresIn * 1000)
        if (expireDate.getTime() < Date.now()) {
            throw new Error("Credential get expired!!")
        }

        const { data: taskSubmission, error: taskSubmissionError } = await getSubmissionInfoById(submissionId)

        if (taskSubmissionError) {
            throw new Error(taskSubmissionError.message);
        }

        const textContent = "📅 Day {{DAY_NUMBER}} / 30 – {{CHALLENGE_NAME}}\n\nToday’s focus was on **{{TODAY_TASK}}**.\n\n✅ What I completed today:\n- {{TASK_POINT_1}}\n- {{TASK_POINT_2}}\n- {{TASK_POINT_3}}\n\n📚 Key learnings:\n- {{LEARNING_1}}\n- {{LEARNING_2}}\n\nThis challenge is helping me build consistency, improve problem-solving, and stay accountable through daily progress.\n\nLooking forward to continuing the journey tomorrow 🚀\n\n#30DayChallenge #DailyProgress #LearningInPublic #Consistency #ProfessionalGrowth #BuildInPublic #CareerGrowth"

        const { uploadUrl, asset: imageAsset } = await registerUploadInLinkedin(userCreds.linkedinId, userCreds.accessToken)
        await uploadBinaryFile(taskSubmission.imageUrl, uploadUrl, userCreds.accessToken);
        await publishLinkedinPostWithImage(userCreds.accessToken, userCreds.linkedinId, imageAsset, textContent, "imageDescription", "imageTitle")

        return { message: "Draft of Linkedin Post is created!!" }
    } catch (error) {
        console.error(error);
        // TODO: return error response.
        return { error: true, message: "failed to share on LinkedIn!!" }
    }
}

export async function checkStreak() {

    const { userId, status, redirectToRegister } = await isRegistered()
    if (!status) return redirectToRegister()

    try {

        const { data: userInfo, error: userInfoError } = await getUserStatsById(userId, true);
        if (userInfoError) throw new Error(userInfoError.message)

        const newUserInfo = updateStreak(userInfo, false)

        if (newUserInfo.streak_status == "reset") {
            newUserInfo.points = userInfo.points - 50;
            const { error } = await updateUserById(userId, newUserInfo)
            if (error) throw new Error(error.message)
            return { error: false, message: "You have lost your streak and 50 XP point", reset: true }
        }
        if (newUserInfo.streak_freeze_count !== undefined) {
            const { error } = await updateUserById(userId, newUserInfo)
            if (error) throw new Error(error.message)
            return { error: false, message: "Streak freeze is used to save your streak!!" }
        }
        return { error: false, message: "Continue Your streak to be in the top of the leaderboard." }
    } catch (error) {
        console.error(error)
        return { error: true, message: "Fail to update your streak!!" }
    }
}