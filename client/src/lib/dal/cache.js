import "server-only"

import { unstable_cache } from "next/cache"
import { getChallengesInfoById, getAllTasks, getTaskInfoById } from "./challenge"

export const getChallengesInfoCacheById = unstable_cache(
    async (challengeId) => await getChallengesInfoById(challengeId),
    [],
    {
        tags: ["get-challenges-info-by-id"]
    }
)

export const getAllTasksCache = unstable_cache(
    async (challengeId) => await getAllTasks(challengeId),
    [],
    {
        tags: "get-all-tasks"
    }
)

export const getTaskInfoCacheById = unstable_cache(
    async (taskId) => await getTaskInfoById(taskId),
    [],
    {
        tags: "get-task-info-by-id"
    }
)