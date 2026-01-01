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

