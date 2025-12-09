"use server"

import { ChallengeCard } from "@/components/challenge-card";
import { createClient } from "@/utils/supabase/server"
import { auth } from "@clerk/nextjs/server";

const Challages = async () => {

    const { userId } = await auth()
    const supabase = await createClient()
    const { data: challenges, error } = await supabase
        .from("challenges")
        .select("title, id, totalRegistrations:challenge_registrations(count), userRegistred:challenge_registrations(id)")
        .filter('challenge_registrations.user_id', 'eq', userId)


    if (error) {
        console.error(error)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    console.log(challenges[0].userRegistred[0])

    return (
        <div className="grid @xl/main:grid-cols-2 @4xl/main:grid-cols-3 gap-6 px-6 py-6">
            {challenges.map(({userRegistred, totalRegistrations, ...challenge}) => (
                <ChallengeCard key={challenge.id} challenge={challenge} count={totalRegistrations[0].count} isRegistred={userRegistred.length > 0}/>
            ))}
        </div>
    );
};

export default Challages;
