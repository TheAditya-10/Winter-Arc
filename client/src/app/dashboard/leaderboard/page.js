"use server"

import { LeaderboardTable, leadearboardColumns } from "@/components/leaderboard-table";
import { getAllUserProfile } from "@/lib/dal/user";
import { auth } from "@clerk/nextjs/server";


export default async function Leaderboard() {

    const { data, error } = await getAllUserProfile()

    const {userId} = await auth()

    if (error) {
        console.error(error)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (<LeaderboardTable columns={leadearboardColumns} data={data} userId={userId} />)
}