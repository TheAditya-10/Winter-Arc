"use server"

import { ChallengeCard } from "@/components/challenge-card";
import { createClient } from "@/utils/supabase/server"
import { auth } from "@clerk/nextjs/server";

const Challages = async () => {

    const { userId } = await auth()
    const supabase = await createClient()
    const { data: challenges, error } = await supabase
        .from("challenges")
        .select("title, id, totalRegistrations:challenge_registrations(count)")

    if (error) {
        console.error(error)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    const { data: userRegistred, error: userRegistredError } = await supabase
        .from("challenge_registrations")
        .select("challenge_id")
        .eq("user_id", userId)

    if (userRegistredError) {
        console.error(userRegistred)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    const userRegSet = new Set(userRegistred.map(e => e.challenge_id))

    return (
        <div className="grid @xl/main:grid-cols-2 @4xl/main:grid-cols-3 gap-6 px-6 py-6">
            {challenges.map(({ totalRegistrations, ...challenge }) => (
                <ChallengeCard key={challenge.id} challenge={challenge} count={totalRegistrations[0].count} isRegistred={userRegSet.has(challenge.id)} />
            ))}
        </div>
    );
};

export default Challages;
