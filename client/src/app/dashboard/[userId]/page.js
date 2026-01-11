"use server"

import ProfileHeader from "@/components/profile-header"
import StatsCards from "@/components/stats-card"
import { ChallengeCard } from "@/components/challenge-card"
import { getUserProfileById, getUserStatsById, getActiveChallengeInfoByUserId } from "@/lib/dal/user"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import Image from "next/image"


export default async function Page({ params, searchParams }) {

    let { userId } = await params;
    const { linkedin } = await searchParams;
    // let isMe = ("me" == (await params)?.userId)

    if (userId == "me") {
        const { userId: uId } = await auth()
        userId = uId;
    }

    const { data: userProfile, error: userProfileError } = await getUserProfileById(userId)

    if (userProfileError) {
        console.error(userProfileError)
        notFound()
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    const { data: userStats, error: userStatsError } = await getUserStatsById(userId, true)

    if (userStatsError) {
        console.error(userStatsError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }


    const { data: activeChallenges, error: activeChallengesError } = await getActiveChallengeInfoByUserId(userId)

    if (activeChallengesError) {
        console.error(activeChallengesError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (<>
        <div className="flex flex-col gap-8 py-4 px-2 @md/main:gap-6 @md/main:py-6">
            <ProfileHeader user={userProfile} />
            <section id="performance-overview">
                <h3 className="mb-4 mt-2 text-center text-xl font-semibold">Performance Overview</h3>
                <StatsCards userStats={userStats} isMe={"me" == (await params).userId} linkedin={linkedin} />
            </section>
            <section id="milestones">
                <h3 className="mb-4 mt-2 text-center text-xl font-semibold">Milestones</h3>
                <MilestoneCards userInfo={userStats} />
            </section>
            <section>
                <h3 className="mb-4 mt-2 text-center text-xl font-semibold">Active Challenges</h3>
                <div className="flex @max-xs/main:flex-col flex-wrap gap-2 w-full items-center justify-center">
                    {activeChallenges.map((challengeInfo) => {
                        return (
                            <div key={challengeInfo.id} className="w-full @min-xs:w-96">
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

const MilestoneCards = ({ userInfo }) => {
    const streakMilestone = { target: [7, 14, 21, 28], reward: [200, 400, 600, 800] }
    const taskMilestone = { target: [10, 20, 30, 50], reward: [100, 200, 300, 400] }
    const referralMilestone = { target: [1, 3, 5], reward: [100, 200, 300] }

    const milestones = [
        {
            image: "/dashboard/milestone-streak.svg",
            title: "X-Days Consistency",
            target: streakMilestone.target[userInfo?.streakMilestoneLevel || 0],
            reward: streakMilestone.reward[userInfo?.streakMilestoneLevel || 0],
            level: userInfo?.streakMilestoneLevel + 1 || 1,
            current: userInfo?.streakCount || 0,
        },
        {
            image: "/dashboard/milestone-task.svg",
            title: "X-Tasks Completed",
            target: taskMilestone.target[userInfo?.taskMilestoneLevel || 0],
            reward: taskMilestone.reward[userInfo?.taskMilestoneLevel || 0],
            level: userInfo?.taskMilestoneLevel + 1 || 1,
            current: userInfo?.dailyTaskCompletedCount || 0,
        },
        {
            image: "/dashboard/milestone-referral.svg",
            title: "X-Referrals",
            target: referralMilestone.target[userInfo?.referralMilestoneLevel || 0],
            reward: referralMilestone.reward[userInfo?.referralMilestoneLevel || 0],
            level: userInfo?.referralMilestoneLevel + 1 || 1,
            current: userInfo?.referralCount || 0,
        },
    ]


    return (<div className="w-full gap-4 items-center justify-center font-inter flex flex-col">
        {milestones.map((ms, i) => {
            return (
            <div key={i} className="flex max-w-[32rem] w-full px-2 gap-4">
                <div className="relative">
                    <Image src={ms.image} width={60} height={0} className="h-auto @max-sm/main:w-12" alt="image" />
                    <span className="absolute bottom-2 text-white @sm/main:text-xs text-[0.6rem] w-full text-center font-bold">{!!ms.reward && `Level ${ms.level}`}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2 justify-center">
                    <div className="flex justify-between">
                        <h3 className="font-semibold @max-sm/main:text-sm">{ms.title}</h3>
                        <span className="text-muted-foreground text-sm">{ms.current} {!!ms.target && `/ ${ms.target}`}</span>
                    </div>
                    <div className="w-full h-2 bg-[#4B4B4B] rounded-full overflow-hidden"><div className="h-full bg-[#FFC800] rounded-full" style={{ width: `${ms.current * 100 / ms.target}%` }} /></div>
                    <div className="text-[#FFC800] text-sm font-medium text-right">{!!ms.reward ? `Earn ${ms.reward} XP` : "completed"}</div>
                </div>
            </div>
            )
        })}
    </div>)
}