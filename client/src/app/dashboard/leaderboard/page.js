"use server"

import { LeaderboardTable, leadearboardColumns } from "@/components/leaderboard-table";
import { getAllUserProfile } from "@/lib/dal/user";


export default async function Leaderboard() {

    const { data, error } = await getAllUserProfile()

    if (error) {
        console.error(error)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    const rankedUsers = data.map((item, index) => {
        return { ...item, rank: index + 1 }
    })

    return (<LeaderboardTable columns={leadearboardColumns} data={data} />)
}