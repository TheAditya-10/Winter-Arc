import "server-only"

import { createClient } from "@/utils/supabase/server";

const supabase = await createClient()

export const getChallengesInfoById = async (challengeId) => {
    const { data, error } = await supabase
        .from("challenges")
        .select("id, title, description, isTech:Tech")
        .eq("id", String(challengeId))
        .limit(1)
        .single()

    return { data, error }
}

export const getAllChallenges = async () => {
    const { data, error } = await supabase
        .from("challenges")
        .select("id, title, description, isTech:Tech")

    return { data, error }
}

export const getTaskInfoById = async (taskId) => {
    const { data, error } = await supabase
        .from("challenge_tasks")
        .select("id, title, description, dayNumber:day_number, challengeId:challenge_id")
        .eq("id", String(taskId))
        .limit(1)
        .single()

    return { data, error }
}

export const getAllTasks = async (challengeId) => {

    console.log("getAllTasks", challengeId, typeof challengeId)
    const { data, error } = await supabase
        .from("challenge_tasks")
        .select("id, title, description, dayNumber:day_number")
        .eq("challenge_id", String(challengeId))
        .order("day_number", { ascending: true })

    return { data, error }
}

export const insertChallengeRegistration = async (user_id, challenge_id) => {
    const { error } = await supabase
        .from("challenge_registrations")
        .insert({ challenge_id: String(challenge_id), user_id: String(user_id) })

    return { error }
}