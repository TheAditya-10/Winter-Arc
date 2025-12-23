"use server"

import ProfileHeader from "@/components/profile-header"
import StatsCards from "@/components/stats-card"
import { ChallengeCard } from "@/components/challenge-card"
import { getUserProfileById, getUserStatsById, getActiveChallengeInfoByUserId } from "@/lib/dal/user"
import { auth } from "@clerk/nextjs/server"


export default async function Page({ params }) {

    let { userId } = await params;

    if (userId == "me") {
        const {userId: uId} = await auth()
        userId = uId;
    }
    
    const { data: userProfile, error: userProfileError } = await getUserProfileById(userId)

    if (userProfileError) {
        console.error(userProfileError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }
    
    const { data: userStats, error: userStatsError } = await getUserStatsById(userId)
    
    if (userStatsError) {
        console.error(userStatsError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }
    

    const { data: activeChallenges, error: activeChallengesError } = await getActiveChallengeInfoByUserId(userId)

    if (activeChallengesError) {
        console.error(activeChallengesError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    return (<>
        <div className="flex flex-col gap-8 py-4 px-2 @md/main:gap-6 @md/main:py-6">
            <ProfileHeader user={userProfile} />
            <section id="performance-overview">
                <h3 className="mb-4 mt-2 text-center text-xl font-semibold">Performance Overview</h3>
                <StatsCards stats={{
                    totalXp: userStats.points,
                    currentStreak: userStats.streakCount,
                    highestStreak: userStats.longestStreak,
                    totalDailyTasks: userStats.dailyTaskCompletedCount,
                }} />
            </section>
            <section>
                <h3 className="mb-4 mt-2 text-center text-xl font-semibold">Active Challenges</h3>
                <div className="flex @md/main:flex-col w-full items-center justify-center">
                    {activeChallenges.map((challengeInfo) => {
                        return (
                            <div key={challengeInfo.id} className="min-w-72 w-96">
                                <ChallengeCard key={challengeInfo.id} challenge={challengeInfo} count={-1} isRegistred={true} />
                            </div>
                        )
                    })}
                </div>
            </section>
        </div >
    </>
    )
}