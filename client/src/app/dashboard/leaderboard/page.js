"use server"

import { LeaderboardTable, leadearboardColumns } from "@/components/leaderboard-table";
import { getAllUserProfile } from "@/lib/dal/user";
import { auth } from "@clerk/nextjs/server";


export default async function Leaderboard() {

    const { data, error } = await getAllUserProfile()

    const {userId} = await auth()

    if (error) {
        console.error(error)
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    return (<LeaderboardTable columns={leadearboardColumns} data={data} userId={userId} />)
}