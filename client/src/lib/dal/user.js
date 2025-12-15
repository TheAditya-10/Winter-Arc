import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";

const supabase = await createClient();

export const getUserProfileById = async (userId) => {

    const { data, error } = await supabase
        .from("users")
        .select("name, username, avatarUrl:avatar_url")
        .eq("id", userId)
        .limit(1)
        .single()

    return { data, error }
}

export const getUserStatsById = async (userId, streakMetadata = false) => {

    const column = `points, streakCount:streak_count, longestStreak:longest_streak${streakMetadata ? ", lastStreakUpdate:last_streak_update_date, streakStatus:streak_status" : ""}`
    const { data, error } = await supabase
        .from("users")
        .select(column)
        .eq("id", userId)
        .limit(1)
        .single()

    return { data: { ...data, taskCompleted: -1 }, error }
}

export const getAllUserProfile = async (orderBy = "points", ascending = false) => {

    const { data, error } = await supabase
        .from("users")
        .select(`id, name, username, avatarUrl:avatar_url, ${orderBy}`)
        .order(orderBy, { ascending: ascending })

    return { data, error }
}

export const getActiveChallengeId = async () => {

    const { userId } = await auth();
    const { data, error } = await supabase
        .from("challenge_registrations")
        .select("challengeId:challenge_id")
        .eq("user_id", userId)

    const hashMap = new Map()

    data?.map(e => hashMap.set(e.challengeId, true))

    return { data: hashMap, error }
}

export const getCompletedTaskInfo = async (challengeId) => {

    const { userId } = await auth();
    const { data, error } = await supabase
        .from("posts")
        .select("taskId:task_id, score:ai_score")
        .eq("user_id", userId)
        .eq("challenge_id", challengeId)

    const hashMap = new Map()

    data?.map(e => hashMap.set(e.taskId, e.score))

    return { data: hashMap, error }
}

export const isUserRegistredInChallenge = async (challengeId) => {

    const { userId } = await auth();
    const { data, error } = await supabase
        .from("challenge_registrations")
        .select("id")
        .eq("user_id", userId)
        .eq("challenge_id", challengeId)
        .limit(1)
        .maybeSingle()

    return { data: !!data, error }
}

export const getActiveChallengeInfoByUserId = async (userId) => {

    const { data, error } = await supabase
        .from("challenge_registrations")
        .select("challenges(id, title)")
        .eq("user_id", userId)

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


export const getUserCred = async () => {

    const { userId } = await auth()
    const { data, error } = await supabase
        .from("linked_creds")
        .select("accessToken:access_token, expiresIn:expires_in, createdAt:created_at, linkedinId:linkedin_id")
        .eq("user_id", userId)
        .limit(1)
        .single()

    return { data: data, error }
}

export const setUserCred = async (access_token, linkedin_id, expires_in) => {
    const { userId } = await auth()

    const { error } = await supabase
        .from("linked_creds")
        .insert({ expires_in, linkedin_id, access_token, user_id: userId })

    return { error }
}




