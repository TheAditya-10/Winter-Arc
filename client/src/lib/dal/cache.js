import "server-only"

import { unstable_cache } from "next/cache"
import { getChallengesInfoById, getAllTasks, getTaskInfoById } from "./challenge"

export const getChallengesInfoCacheById = unstable_cache(
    async (challengeId) => await getChallengesInfoById(challengeId),
    ['get-challenges-info'],
    {
        tags: ["get-challenges-info-by-id"],
        revalidate: false // Cache indefinitely - challenges don't change during event
    }
)

export const getAllTasksCache = unstable_cache(
    async (challengeId) => await getAllTasks(challengeId),
    ['get-all-tasks'],
    {
        tags: ["get-all-tasks"],
        revalidate: false // Cache indefinitely - tasks don't change during event
    }
)

export const getTaskInfoCacheById = unstable_cache(
    async (taskId) => await getTaskInfoById(taskId),
    ['get-task-info'],
    {
        tags: ["get-task-info-by-id"],
        revalidate: false // Cache indefinitely - tasks don't change during event
    }
)