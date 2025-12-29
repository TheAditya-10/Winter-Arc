"use server"

import { TaskManager } from "@/components/task-manager"
import { getTaskInfoCacheById } from "@/lib/dal/cache"
import { isRegistered } from "@/utils/auth"
import { notFound } from "next/navigation"

export default async function Page({ params }) {

    const {status, redirectToRegister} = await isRegistered()
    if(!status) return redirectToRegister()

    const { taskId } = await params

    const { data: task, error: taskError } = await getTaskInfoCacheById(taskId)
    if (taskError) {
        console.error(taskError)
        notFound()
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (
        <TaskManager task={task} />
    )
}