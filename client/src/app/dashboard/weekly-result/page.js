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
                "5ef121a2-e8ff-4bfd-9350-e14d4a915877", // 1st
                "ff368b6b-c327-4756-a32a-62c996ab2640", // 2nd
                "3134444f-c59e-4220-b7e6-21a95ee34c95", // 3rd
            ]
        },
        "week-two": {
            dayNumber: 11,
            state: getWeekState(11),
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

