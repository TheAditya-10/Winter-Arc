"use server"
import { TZDate } from "@date-fns/tz"
import { IconLock, IconActivity, IconCheck } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Page() {

    const icons = {
        upcoming: <IconLock className="w-8 h-8" />,
        active: <IconActivity className="w-8 h-8" />,
        completed: <IconCheck className="w-8 h-8" />,
    }

    const titles = ["Week One", "Week Two", "Week Three", "Week Four"]

    const weeklyTaskStartTime = ["04", "11", "18", "25"].map((dayNumber) => new TZDate(new Date(`2026-01-${dayNumber}T00:00:00`), "Asia/Calcutta").getTime())

    const weeklyTaskState = weeklyTaskStartTime.map((startTime) => {
        const now = new TZDate(new Date(), "Asia/Calcutta").getTime();
        if (now - startTime < 0) return "upcoming";
        else if (now - startTime < 24 * 60 * 60 * 1000) return "active";
        else return "completed";
    })

    return (
        <div className="flex flex-col w-full gap-4 p-4 items-center">
            {weeklyTaskState.map((state, i) => (
                <Card
                    key={titles[i]}
                    className="rounded-2xl shadow-md bg-gradient-to-br from-background to-muted/30 border border-muted/40 hover:shadow-lg transition-all p-5 w-64 @lg/main:w-96"
                >
                    <CardContent className="flex flex-col gap-4 items-center justify-between p-0">
                        <div className="flex justify-between px-4 w-full">
                            <p className="text-sm text-foreground font-medium tracking-wide">{titles[i]}</p>
                            <Badge variant="secondary">{state}</Badge>
                        </div>
                        <div className="flex w-full gap-4 items-center justify-between px-4">
                            <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner">
                                {icons[state]}
                            </div>
                            {state != "upcoming" && (<div>
                                <Link href={`/dashboard/weekly-tasks/${titles[i].replace(" ", "-").toLowerCase()}`}><Button variant={state == "completed" ? "secondary" : "default"}>{state == "completed" ? "Stats" : "Tasks"}</Button></Link>
                            </div>)}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

