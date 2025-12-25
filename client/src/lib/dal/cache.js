import "server-only"

import { unstable_cache } from "next/cache"
import { getChallengesInfoById, getAllTasks, getTaskInfoById } from "./challenge"

export const getChallengesInfoCacheById = unstable_cache(
    async (challengeId) => await getChallengesInfoById(challengeId)
)

export const getAllTasksCache = unstable_cache(
    async (challengeId) => await getAllTasks(challengeId)
)

export const getTaskInfoCacheById = unstable_cache(
    async (taskId) => await getTaskInfoById(taskId)
)