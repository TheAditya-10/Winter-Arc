"use server"

import { ChallengeDetail } from "@/components/challenge-detail"
import { getCompletedTaskInfo, isUserRegistredInChallenge } from "@/lib/dal/user"
import { getChallengesInfoCacheById, getAllTasksCache } from "@/lib/dal/cache"

export default async function ChallengePage({ params }) {

    const { challengeId } = await params

    const {data: challengeInfo, error: challengeInfoError} = await getChallengesInfoCacheById(challengeId)
    if (challengeInfoError) {
        console.error(challengeInfoError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }
    
    const {data: challengeTasks, error: challengeTasksError} = await getAllTasksCache(challengeId)
    if (challengeTasksError) {
        console.error(challengeTasksError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    const {data: completedTaskInfoMap, error: completedTaskInfoMapError} = await getCompletedTaskInfo(challengeId)
    
    if (completedTaskInfoMapError) {
        console.error(completedTaskInfoMapError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }
    
    const {data:isRegistred, error: isRegistredError} = await isUserRegistredInChallenge(challengeId)
    if (isRegistredError) {
        console.error(isRegistredError)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }


    return (
        <ChallengeDetail tasks={challengeTasks} challenge={challengeInfo} isRegistred={isRegistred} taskCompleted={completedTaskInfoMap} />
    )
}