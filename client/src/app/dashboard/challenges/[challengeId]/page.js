"use server"

import { ChallengeDetail } from "@/components/challenge-detail"
import { getCompletedTaskInfo, isUserRegistredInChallenge } from "@/lib/dal/user"
import { getChallengesInfoCacheById, getAllTasksCache } from "@/lib/dal/cache"


export default async function ChallengePage({ params }) {
    
    const { challengeId } = await params

    const {data: challengeInfo, error: challengeInfoError} = await getChallengesInfoCacheById(challengeId)
    if (challengeInfoError) {
        console.error(challengeInfoError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }
    
    const {data: challengeTasks, error: challengeTasksError} = await getAllTasksCache(challengeId)
    if (challengeTasksError) {
        console.error(challengeTasksError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    const {data: completedTaskInfoMap, error: completedTaskInfoMapError} = await getCompletedTaskInfo(challengeId)
    
    if (completedTaskInfoMapError) {
        console.error(completedTaskInfoMapError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }
    
    const {data:isRegistred, error: isRegistredError} = await isUserRegistredInChallenge(challengeId)
    if (isRegistredError) {
        console.error(isRegistredError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (
        <ChallengeDetail tasks={challengeTasks} challenge={challengeInfo} isRegistred={isRegistred} taskCompleted={completedTaskInfoMap} />
    )
}