'use server'

import { getAllWeeklySubmissions } from "@/lib/dal/submission";
import { TZDate } from "@date-fns/tz";
import { WeeklyLeaderboardTable, weeklyleadearboardColumns } from "@/components/weekly-leaderboard";

function getWeekState(dayNumber) {
    const startTime = new TZDate(
        2026,
        0,                // January (0-based)
        Number(dayNumber),
        0, 0, 0,          // 00:00:00
        "Asia/Kolkata"
    ).getTime();
    const now = new TZDate(new Date(), "Asia/Kolkata").getTime();
    if (now - startTime < 0) return "upcoming";
    else if (now - startTime < 24 * 60 * 60 * 1000) return "active";
    else return "completed";
}

export default async function Page() {

    const weekInfo = {
        "week-one": {
            dayNumber: 4,
            state: getWeekState(4),
            winners: [
                // "a308a296-8d9e-496c-9c5f-977ea135e02f",
                // "b181d4dc-c2d6-4e21-aea7-d64427aa4ea1",
                // "6a17ad75-26df-4b54-8415-b5e373ab3921",
            ]
        },
        "week-two": {
            dayNumber: 9,
            state: getWeekState(9),
            winners: []
        },
        "week-three": {
            dayNumber: 18,
            state: getWeekState(18),
            winners: []
        },
        "week-four": {
            dayNumber: 25,
            state: getWeekState(25),
            winners: []
        },
    }

    const {data: submissions, error} = await getAllWeeklySubmissions()

    if (error) {
        console.error(error)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (<section className="flex flex-col items-center justify-center">
        <WeeklyLeaderboardTable columns={weeklyleadearboardColumns} data={submissions} weeklyInfo={weekInfo}/>
    </section>)
}

