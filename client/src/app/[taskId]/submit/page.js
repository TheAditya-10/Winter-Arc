"use server"

import { TaskManager } from "@/components/task-manager"
import { getTaskInfoCacheById } from "@/lib/dal/cache"
import { isRegistered } from "@/utils/auth"
import { notFound, redirect } from "next/navigation"

export default async function Page({ params, searchParams }) {

    const {status, redirectToRegister} = await isRegistered()
    if(!status) return redirectToRegister()

    // Check if submission deadline has passed (Jan 30, 2026 11:59 PM IST)
    const deadline = new Date('2026-01-30T23:59:59+05:30').getTime()
    const currentTime = new Date().getTime()
    
    if (currentTime > deadline) {
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Submission Closed!!</h1></div>)
    }

    const { taskId } = await params
    const { isTech } = await searchParams;

    const { data: task, error: taskError } = await getTaskInfoCacheById(taskId)
    if (taskError) {
        console.error(taskError)
        notFound()
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (
        <TaskManager task={task} isTech={isTech}/>
    )
}