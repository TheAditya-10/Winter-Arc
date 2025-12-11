"use server"

import { createClient } from "@/utils/supabase/server"
import { ChallengeDetail } from "@/components/challenge-detail"
import { auth } from "@clerk/nextjs/server"

export default async function ChallengePage({ params }) {
    const { challengeId } = await params
    const { userId } = await auth()

    const supabase = await createClient()
    const { data, error } = await supabase
        .from("challenges")
        .select("*, challenge_tasks(*), challenge_registrations(id), posts(task_id, ai_score)")
        .eq("id", challengeId)
        .eq("posts.user_id", userId)
        .filter('challenge_registrations.user_id', 'eq', userId)
        .limit(1)
        .single()
        .order("day_number", { referencedTable: 'challenge_tasks' })

    if (error) {
        console.error(error)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }
    const { challenge_tasks: tasks, challenge_registrations: registred, posts: taskCompleted, ...challenge } = data

    const isRegistred = (registred.length > 0)
    
    return (
        <ChallengeDetail tasks={tasks} challenge={challenge} isRegistred={isRegistred} taskCompleted={taskCompleted} />
    )
}