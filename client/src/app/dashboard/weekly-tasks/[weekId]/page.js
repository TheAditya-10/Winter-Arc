"use server"

import { TZDate } from "@date-fns/tz"
import { notFound } from "next/navigation";

const weekMap = {
    "week-one": "04",
    "week-two": "11",
    "week-three": "18",
    "week-four": "25",
}

function getWeekState(dayNumber) {
    const startTime = new TZDate(new Date(`2025-12-${dayNumber}T00:00:00`), "Asia/Calcutta").getTime()
    const now = new TZDate(new Date(), "Asia/Calcutta").getTime();
    if (now - startTime < 0) return "upcoming";
    else if (now - startTime < 24 * 60 * 60 * 1000) return "active";
    else return "completed";
}

export default async function Page({ params }) {
    const { weekId } = await params
    
    if(!weekMap[weekId]) return notFound()

    const weekState = getWeekState(weekMap[weekId])

    return <p>{weekState}</p>

}