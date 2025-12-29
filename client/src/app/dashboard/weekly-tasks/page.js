"use server"
import { TZDate } from "@date-fns/tz"
import { IconLock, IconActivity, IconCheck } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Timer } from "@/components/timer"

export default async function Page() {

    const icons = {
        upcoming: <IconLock className="w-8 h-8" />,
        active: <IconActivity className="w-8 h-8" />,
        completed: <IconCheck className="w-8 h-8" />,
    }

    const weeklyTaskStartTime = ["04", "11", "18", "25"].map((dayNumber) => new TZDate(new Date(`2026-01-${dayNumber}T00:00:00`), "Asia/Calcutta").getTime())

    const weeklyTaskState = weeklyTaskStartTime.map((startTime) => {
        const now = new TZDate(new Date(), "Asia/Calcutta").getTime();
        if (now - startTime < 0) return "upcoming";
        else if (now - startTime < 24 * 60 * 60 * 1000) return "active";
        else return "completed";
    })

    const currentWeekInfo = weeklyTaskState.reduce((acc, curr, i) => {
        if (curr != "completed" && !acc) return { state: curr, index: i }
        return acc
    }, null)

    const progressState = (Date.now() - weeklyTaskStartTime[0])/(weeklyTaskStartTime[3]-weeklyTaskStartTime[0])

    return (
        <section className="flex flex-col items-center gap-4 px-2">
            <div className="rounded-lg p-4 max-w-[30rem] w-full my-4 text-center text-xl font-bold bg-[#021024] shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                JOIN US ON SUNDAY!!
            </div>
            <div className="flex w-full max-w-[36rem] gap-4 items-center justify-between relative">
                <div className="w-[calc(100%-24px)] mx-3 overflow-hidden rounded-full h-2 absolute bg-[#616E95] top-4 sm:top-6">
                    <div className="h-full bg-[#3FD7FA] rounded-full" style={{ width: `${(progressState > 0? progressState : 0) * 100}%` }} />
                </div>
                {weeklyTaskState.map((state, i) => (
                    <div key={i} className={`${state == "active" ? "text-[#2DB4E0]" : "text-white"} flex items-center justify-center mb-4`}>
                        <div
                            className="size-12 sm:size-16 text-center relative flex items-center justify-center cursor-pointer">
                            <Image src={`/challenge-detail/${state == "active" ? "white" : (state == "completed" ? "blue" : "gray")}-snow-ball.svg`} alt="weekly-task" fill className="absolute top-0 bottom-0" />
                            <span className="absolute z-1000 font-semibold text-xs sm:top-2 top-1">week</span>
                            <p className={`z-10 relative text-xl font-bold `}>{i + 1}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="rounded-lg p-4 max-w-[30rem] w-full my-4 bg-[#021024] shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                <h3 className="font-bold text-xl">STARTS IN:</h3>
                <div className="font-semibold flex items-center justify-center my-8">
                    <Timer timestamp={weeklyTaskStartTime[currentWeekInfo?.index]+(currentWeekInfo?.state == "active"? 24*60*60*1000: 0)} />
                </div>
            </div>
        </section>
    );
}

