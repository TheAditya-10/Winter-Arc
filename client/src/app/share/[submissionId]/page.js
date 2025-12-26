"use server"

import { DraftArea } from "@/components/draft-area"
import { getTaskInfoCacheById, getChallengesInfoCacheById } from "@/lib/dal/cache"
import { getSubmissionInfoById } from "@/lib/dal/submission"
import { isRegistered } from "@/utils/auth"

export default async function Page({ params }) {

    const { status, redirectToRegister } = await isRegistered()
    if (!status) return redirectToRegister()

    const { submissionId } = await params


    const { data: submissionInfo, error: submissionError } = await getSubmissionInfoById(submissionId)
    if (submissionError) {
        console.error(submissionError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    const { data: taskInfo, error: taskError } = await getTaskInfoCacheById(submissionInfo.taskId)
    if (taskError) {
        console.error(taskError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    const { data: challengeInfo, error: challengeError } = await getChallengesInfoCacheById(submissionInfo.challengeId)
    if (challengeError) {
        console.error(challengeError)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (
        <DraftArea taskInfo={taskInfo} submissionInfo={submissionInfo} challengeInfo={challengeInfo} />
    )
}