import "server-only"

import { createClient } from "@/utils/supabase/server";

const supabase = await createClient();

export const insertSubmission = async (taskSubmission) => {
    const { data, error } = await supabase
        .from('posts')
        .insert(taskSubmission)
        .select('id')
        .limit(1)
        .single();

    return { data: data?.id, error }
}

export const updateSubmissionById = async (submissionId, taskSubmission) => {
    const { error } = await supabase
    .from('posts')
    .update(taskSubmission)
    .eq('id', String(submissionId))
    
    return { error }
}

export const getSubmissionInfoById = async (submissionId) => {
    const { data, error } = await supabase
    .from('posts')
    .select('taskId:task_id, challengeId:challenge_id, imageUrl:image_url, score:ai_score, description:text')
    .eq('id', String(submissionId))
    .limit(1)
    .single()
    
    return { data, error }
}


export const insertWeeklyNFinalSubmission = async (submission, type="weekly") => {

    const { error } = await supabase
        .from(`${type}_submissions`)
        .insert(submission)

    return { error }
}

export const getAllWeeklySubmissions = async () => {
    
    const { data, error } = await supabase
        .from('weekly_submissions')
        .select('id, user:users(id, name, username, avatarUrl:avatar_url), weekId:week_id, driveUrl:drive_url')
    
    return { data, error }
}

export const getFinalSubmissionByUserId = async (userId) => {
    
    const { data, error } = await supabase
        .from('final_submissions')
        .select('id, driveUrl:drive_url, description, score')
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle()
    
    return { data, error }
}
