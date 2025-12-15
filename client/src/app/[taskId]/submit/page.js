"use server"

import { TaskManager } from "@/components/task-manager"
import { getTaskInfoById } from "@/lib/dal/challenge"
import { isRegistered } from "@/utils/auth"

export default async function Page({ params }) {

    const {status, redirectToRegister} = await isRegistered()
    if(!status) return redirectToRegister()

    const { taskId } = await params

    const { data: task, error: taskError } = await getTaskInfoById(taskId)
    if (taskError) {
        console.error(taskError)
        return <h1>Some thing went wrong. Please try again later!!</h1>
    }

    return (
        <TaskManager task={task} />
    )
}