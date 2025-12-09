"use server"

import { createClient } from "@/utils/supabase/server"
import { TaskSubmissionDialog } from "@/components/task-submission"


export default async function Page({ params }) {
    const { taskId } = await params
    const supabase = await createClient()
    // const { data, error } = await supabase
    //     .from("posts")
    //     .select()
    //     .eq('id', taskId)
    //     .limit(1)
    //     .single()

    // if (error) {
    //     console.error(error)
    //     return <h1>Some thing went wrong. Please try again later!!</h1>
    // }
    return (
        <>
            <h1>{taskId}</h1>
            <TaskSubmissionDialog showDialog={true}/>
        </>

    )
}