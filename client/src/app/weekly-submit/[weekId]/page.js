"use server"

import { WeeklyFormSubmit } from "@/components/weekly-submit-form"
import { notFound } from "next/navigation"
import { isRegistered } from "@/utils/auth"
import { redirect } from "next/navigation"
import { TZDate } from "@date-fns/tz"

export default async function Page({ params }) {

    const {status, redirectToRegister} = await isRegistered()
    if(!status) return redirectToRegister()

    const { weekId } = await params
    const weekInfo = {
        "week-one": {number: 1, title: "Winter Arc: Build in 60", dayNumber: 4},
        "week-two": {number: 2, title: "Weekly Challenge 2", dayNumber: 11},
        "week-three": {number: 3, title: "Weekly Challenge 3", dayNumber: 18},
        "week-four": {number: 4, title: "Weekly Challenge 4", dayNumber: 27},
    }

    if(!weekInfo[weekId]) return notFound()

    const startTime = new TZDate(new Date(`2026-01-${weekInfo[weekId].dayNumber}T00:00:00`), "Asia/Calcutta").getTime()
    const currentTime = new TZDate(new Date(), "Asia/Calcutta").getTime()

    if(currentTime < startTime || currentTime > startTime+24*60*60*1000){
        return redirect("/dashboard/weekly-tasks")
    }

    return <WeeklyFormSubmit weekId={weekId} weekNumber={weekInfo[weekId].number} weekTitle={weekInfo[weekId].title} />
}