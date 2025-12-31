import "server-only"

import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";

const supabase = await createClient();

export const getUserProfileById = async (userId) => {

    const { data, error } = await supabase
        .from("users")
        .select("name, username, avatarUrl:avatar_url")
        .eq("id", String(userId))
        .limit(1)
        .single()

    return { data, error }
}

export const getUserStatsById = async (userId, streakMetadata = false) => {

    const column = `points, streakCount:streak_count, longestStreak:longest_streak, dailyTaskCompletedCount:daily_task_completed_count${streakMetadata ? ", lastStreakUpdate:last_streak_update_date, streakStatus:streak_status, streakFreezeCount:streak_freeze_count" : ""}`
    const { data, error } = await supabase
        .from("users")
        .select(column)
        .eq("id", String(userId))
        .limit(1)
        .single()

    return { data, error }
}

export const getAllUserProfile = async () => {

    const { data, error } = await supabase
        .from("users")
        .select(`id, name, username, avatarUrl:avatar_url, points, weeklyPoints:weekly_points`)

    return { data, error }
}

export const getActiveChallengeId = async () => {

    const { userId } = await auth();
    const { data, error } = await supabase
        .from("challenge_registrations")
        .select("challengeId:challenge_id")
        .eq("user_id", String(userId))

    const hashMap = new Map()

    data?.map(e => hashMap.set(String(e.challengeId), true))

    return { data: hashMap, error }
}

export const getCompletedTaskInfo = async (challengeId) => {

    const { userId } = await auth();
    const { data, error } = await supabase
        .from("posts")
        .select("taskId:task_id, score:ai_score")
        .eq("user_id", String(userId))
        .eq("challenge_id", String(challengeId))
        .not("image_url", "is", null)

    const hashMap = new Map()
    let xpEarned = 0;
    data?.map(e => {
        xpEarned += e.score;
        hashMap.set(String(e.taskId), e.score);
    })

    hashMap.set("xpEarned", xpEarned || 0);
    return { data: hashMap, error }
}

export const isUserRegistredInChallenge = async (challengeId) => {

    const { userId } = await auth();
    const { data, error } = await supabase
        .from("challenge_registrations")
        .select("id")
        .eq("user_id", String(userId))
        .eq("challenge_id", String(challengeId))
        .limit(1)
        .maybeSingle()

    return { data: !!data, error }
}

export const getActiveChallengeInfoByUserId = async (userId) => {

    const { data, error } = await supabase
        .from("challenge_registrations")
        .select("challenges(id, title)")
        .eq("user_id", String(userId))

    return { data: data?.map(e => e.challenges), error }
}

export const updateUserById = async (userId, newUser) => {
    const { error } = await supabase
        .from("users")
        .update(newUser)
        .eq("id", userId)

    return { error }
}

export const insertUser = async (user) => {

    const { error } = await supabase
        .from("users")
        .insert(user)

    return { error }
}



