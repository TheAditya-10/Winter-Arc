import { createClient } from "@/utils/supabase/server";

const supabase = await createClient()

export const getChallengesInfoById = async (challengeId) => {
    const { data, error } = await supabase
        .from("challenges")
        .select("title, description")
        .eq("id", challengeId)
        .limit(1)
        .single()

    return { data, error }
}

export const getAllChallenges = async () => {
    const { data, error } = await supabase
        .from("challenges")
        .select("id, title, description")

    return { data, error }
}

export const getTaskInfoById = async (taskId) => {
    const { data, error } = await supabase
        .from("challenge_tasks")
        .select("title, description, dayNumber:day_number, challengeId:challenge_id")
        .eq("id", taskId)
        .limit(1)
        .single()

    return { data, error }
}

export const getAllTasks = async (challengeId) => {

    const { data, error } = await supabase
        .from("challenge_tasks")
        .select("id, title, description, dayNumber:day_number")
        .eq("challenge_id", challengeId)
        .order("day_number", { ascending: true })

    return { data, error }
}

export const insertChallengeRegistration = async (user_id, challenge_id) => {
    const { error } = await supabase
        .from("challenge_registrations")
        .insert({ challenge_id, user_id })

    return { error }
}