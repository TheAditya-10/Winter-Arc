"use server"

import { ChallengeCard } from "@/components/challenge-card";
import { getAllChallenges } from "@/lib/dal/challenge";
import { getActiveChallengeId } from "@/lib/dal/user";

const Challages = async () => {
    
    const { data: challenges, error } = await getAllChallenges()

    if (error) {
        console.error(error)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    const { data: userActiveChallengeMap, error: userActiveChallengeMapError } = await getActiveChallengeId()

    if (userActiveChallengeMapError) {
        console.error(userActiveChallengeMapError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    return (
        <div className="grid @xl/main:grid-cols-2 @4xl/main:grid-cols-3 gap-6 px-6 py-6">
            {challenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} count={-1} isRegistred={userActiveChallengeMap.get(challenge.id)} />
            ))}
        </div>
    );
};

export default Challages;
