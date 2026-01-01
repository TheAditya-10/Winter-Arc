"use server"

import { TaskManager } from "@/components/task-manager"
import { getTaskInfoCacheById } from "@/lib/dal/cache"
import { isRegistered } from "@/utils/auth"
import { notFound } from "next/navigation"

export default async function Page({ params }) {

    const {status, redirectToRegister} = await isRegistered()
    if(!status) return redirectToRegister()

    const { taskId } = await params

    console.log('Submit page - taskId:', taskId, 'type:', typeof taskId)

    const { data: task, error: taskError } = await getTaskInfoCacheById(taskId)
    
    console.log('Task fetch result:', { task, taskError })
    
    if (taskError || !task) {
        console.error('Task fetch failed:', taskError)
        notFound()
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (
        <TaskManager task={task} />
    )
}