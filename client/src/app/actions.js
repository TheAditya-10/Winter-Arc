'use server'
import { auth } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"
import { registerFormSchema, submitFormSchema, draftFormSchema } from "./schema"
import { z } from "zod"
import { evaluateTaskSubmissionsByAI } from "@/ai/controllers"
import { updateStreak, checkForBonus } from "@/utils/streaks"
import { submissionLimit } from "@/utils/rate-limiter"
import { uploadBinaryFile, registerUploadInLinkedin, publishLinkedinPostWithImage } from "@/utils/share-on-linkedin"
import { insertChallengeRegistration } from "@/lib/dal/challenge"
import { getChallengesInfoCacheById } from "@/lib/dal/cache"
import { getUserStatsById, insertUser, updateUserById } from "@/lib/dal/user"
import { getUserCred } from "@/lib/dal/creds"
import { getSubmissionInfoById, insertSubmission, updateSubmissionById } from "@/lib/dal/submission"
import { redirect } from "next/navigation"
import { isRegistered } from "@/utils/auth"
import { genrateSignature } from "@/utils/cloud-storage"
import { withServerActionInstrumentation } from "@sentry/nextjs"
import {createVerifcationState} from "@/utils/share-on-linkedin"

const clerk = await clerkClient()

export async function createUser(formData, userLocalTimeZone) {

    return withServerActionInstrumentation("create-user",
        async () => {

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
                    console.error(error)
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
    )
}

export async function evaluateSubmission(formData, task, submissionId) {

    return withServerActionInstrumentation("evaluate-submission",
        async () => {

            const { userId, status, redirectToRegister } = await isRegistered()
            if (!status) return redirectToRegister()

            try {

                const { data: challenge, error: challengeError } = await getChallengesInfoCacheById(task.challengeId)
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

                newUserInfo.daily_task_completed_count = userInfo.dailyTaskCompletedCount + 1;

                const {bonusPoints, messages, userMilestoneInfo} = checkForBonus({
                    streakCount: newUserInfo.streak_count,
                    dailyTaskCompletedCount: userInfo.dailyTaskCompletedCount + 1,
                    streakMilestoneLevel: 0,
                    taskMilestoneLevel: 0
                })

                // TODO: update milestone info in database.
                // newUserInfo.points += bonusPoints
                // console.log(bonusPoints, messages, userMilestoneInfo)

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

                if(newUserInfo.streak_count) messages.streak.push({ text: "Your streak is updated successfully.", highlight: `+${newUserInfo.streak_count.count} DAY STREAK` })
                messages.task.push({ text: "Submit successfully!!", highlight: `+${finalState.score} XP` })
                
                return { messages, score: finalState.score, feedback: finalState.feedback }
            } catch (error) {
                console.error("Error:\n", error)
                return { message: "Please try again later!!", error: true }
            }
        }
    )
}

export async function createSubmission(formData, task) {

    return withServerActionInstrumentation("create-submission",
        async () => {
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
    )
}

export async function registerForChallenge(challengeId) {

    return withServerActionInstrumentation("register-for-challenge",
        async () => {

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
    )
}


export async function shareOnLinkedIn(formData) {

    return withServerActionInstrumentation("share-on-linkedin",
        async () => {
            const { status, redirectToRegister } = await isRegistered()
            if (!status) return redirectToRegister()

            try {
                // verify form data
                const { success: formVerified, error: formError } = draftFormSchema.safeParse(formData)

                if (!formVerified) {
                    const formFieldErrors = z.flattenError(formError).fieldErrors

                    return {
                        error: {
                            textContent: formFieldErrors.description?.shift(),
                            imageUrl: formFieldErrors.imageFile?.shift(),
                        },
                        message: "Invalid input!!"
                    }
                }

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

                const {textContent, imageUrl} = formData

                const { uploadUrl, asset: imageAsset } = await registerUploadInLinkedin(userCreds.linkedinId, userCreds.accessToken)
                await uploadBinaryFile(imageUrl, uploadUrl, userCreds.accessToken);
                await publishLinkedinPostWithImage(userCreds.accessToken, userCreds.linkedinId, imageAsset, textContent, "imageDescription", "imageTitle")

                return { message: "Draft of Linkedin Post is created!!" }
            } catch (error) {
                console.error(error);
                // TODO: return error response.
                return { error: true, message: "failed to share on LinkedIn!!" }
            }
        }
    )
}

export async function checkStreak() {

    return withServerActionInstrumentation("check-streak",
        async () => {
            const { userId, status, redirectToRegister } = await isRegistered()
            if (!status) return redirectToRegister()

            try {

                const { data: userInfo, error: userInfoError } = await getUserStatsById(userId, true);
                if (userInfoError) throw new Error(userInfoError.message)

                const newUserInfo = updateStreak(userInfo, false)

                let response = { }

                if (newUserInfo.streak_freeze_count !== undefined) {
                    response = { state: "freeze" }
                }

                if (newUserInfo.streak_status == "reset") {
                    newUserInfo.points = userInfo.points - 50;
                    response = { state: "reset" }
                }

                const { error } = await updateUserById(userId, newUserInfo)
                if (error) throw new Error(error.message)

                const clientUserInfo = {
                    longestStreak: newUserInfo.longest_streak || userInfo.longestStreak,
                    points: newUserInfo.points || userInfo.points,
                    streakCount: newUserInfo.streak_count || userInfo.streakCount,
                    streakFreezeCount: newUserInfo.streak_freeze_count || userInfo.streakFreezeCount 
                }

                return { error: false, userStats: clientUserInfo, ...response }
            } catch (error) {
                console.error(error)
                return { error: true, message: "Fail to update your streak!!" }
            }
        }
    )
}

export async function initiateConnectWithLinkedin() {
        const { status, redirectToRegister, userId } = await isRegistered()
        if (!status) return redirectToRegister()

        const state = await createVerifcationState(userId)

        const url = `https://www.linkedin.com/oauth/v2/authorization?enable_extended_login=true&response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&state=${state}&scope=profile%20email%20w_member_social%20openid`

        return redirect(url)
    }