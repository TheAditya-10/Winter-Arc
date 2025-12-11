"use server"

import ProfileHeader from "@/components/profile-header"
import StatsCards from "@/components/stats-card"
import { createClient } from "@/utils/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { ChallengeCard } from "@/components/challenge-card"


export default async function Dashboard() {
    const supabase = await createClient();



    const { userId, sessionClaims } = await auth();
    const { data: userInfo, error: userInfoError } = await supabase
        .from("users")
        .select("*,totalTaskCompleted:posts(count)")
        .eq("id", userId)
        .limit(1)
        .single();

    if (userInfoError) {
        console.error(userInfoError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }


    const { data: recentSubmissions, error: recentSubmissionsError } = await supabase
        .from("posts")
        .select("ai_score, created_at, challenge_title:challenges(title)")
        .eq('user_id', userId)
        .limit(10);

    if (recentSubmissionsError) {
        console.error(recentSubmissionsError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    const { data: activeChallenges, error: activeChallengesError } = await supabase
        .from("challenge_registrations")
        .select("challenges(id, title, totalRegistrations:challenge_registrations(count))")
        .eq('user_id', userId);

    if (activeChallengesError) {
        console.error(activeChallengesError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    return (<>
        <div className="flex flex-col gap-8 py-4 px-2 @md/main:gap-6 @md/main:py-6">
            <ProfileHeader user={userInfo} />
            <section id="performance-overview">
                <h3 className="mb-4 mt-2 text-center text-xl font-semibold">Performance Overview</h3>
                <StatsCards stats={{
                    totalXp: userInfo.points,
                    currentStreak: userInfo.streak_count,
                    highestStreak: userInfo.longest_streak,
                    totalTasks: userInfo.totalTaskCompleted[0].count,
                }} />
            </section>
            <section>
                <h3 className="mb-4 mt-2 text-center text-xl font-semibold">Active Challenges</h3>
                <div className="flex @md/main:flex-col w-full items-center justify-center">
                    {activeChallenges.map((challengeInfo) => {
                        const { totalRegistrations, ...challenge } = challengeInfo.challenges;
                        return (
                            <div key={challenge.id} className="min-w-72 w-96">
                                <ChallengeCard key={challenge.id} challenge={challenge} count={totalRegistrations[0].count} isRegistred={true} />
                            </div>
                        )
                    })}
                </div>
            </section>
        </div >
    </>
    )
}