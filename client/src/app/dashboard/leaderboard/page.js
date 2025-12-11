"use server"

import { LeaderboardTable, leadearboardColumns, leaderboardInitialData } from "@/components/leaderboard-table";
import { createClient } from "@/utils/supabase/server";
export default async function Leaderboard() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users")
        .select("name, username, id, points, avatar_url")
        .gt("points", 0)
        .order("points", { ascending: false })

    const rankedUsers = data.map((item, index) => {
        return { ...item, rank: index + 1 }
    })
    
    return (<LeaderboardTable columns={leadearboardColumns} data={rankedUsers} />)
}