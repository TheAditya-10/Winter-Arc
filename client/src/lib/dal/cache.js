import "server-only"

import { unstable_cache } from "next/cache"
import { getChallengesInfoById, getAllTasks, getTaskInfoById } from "./challenge"

export const getChallengesInfoCacheById = async (challengeId) => {
    const cachedFn = unstable_cache(
        async () => await getChallengesInfoById(challengeId),
        ['get-challenges-info', String(challengeId)],
        {
            tags: ["get-challenges-info-by-id"],
            revalidate: false
        }
    )
    return cachedFn()
}

export const getAllTasksCache = async (challengeId) => {
    const cachedFn = unstable_cache(
        async () => await getAllTasks(challengeId),
        ['get-all-tasks', String(challengeId)],
        {
            tags: ["get-all-tasks"],
            revalidate: false
        }
    )
    return cachedFn()
}

export const getTaskInfoCacheById = async (taskId) => {
    const cachedFn = unstable_cache(
        async () => await getTaskInfoById(taskId),
        ['get-task-info', String(taskId)],
        {
            tags: ["get-task-info-by-id"],
            revalidate: false
        }
    )
    return cachedFn()
}