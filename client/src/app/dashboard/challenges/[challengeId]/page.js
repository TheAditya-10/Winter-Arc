"use server"

import { createClient } from "@/utils/supabase/server"
import { ChallengeDetail } from "@/components/challenge-detail"

export default async function ChallengePage({ params }) {
    const { challengeId } = await params

    const supabase = await createClient()
    const { data, error } = await supabase
        .from("challenges")
        .select("*, challenge_tasks(*)")
        .eq("id", challengeId)
        .limit(1)
        .single()
        .order("day_number", { referencedTable: 'challenge_tasks' })

    if (error) {
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    const {challenge_tasks: tasks, ...challenge} = data
    
    return (
        <ChallengeDetail tasks={tasks} challenge={challenge} />
    )
}