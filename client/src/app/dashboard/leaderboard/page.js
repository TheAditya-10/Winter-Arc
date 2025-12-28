"use server"

import LeaderboardClient from "@/components/leaderboard-client"; 
import { getAllUserProfile } from "@/lib/dal/user";
import { auth } from "@clerk/nextjs/server";

export default async function LeaderboardPage() {

    // Fetch data from your actual backend
    const { data: allUsers, error } = await getAllUserProfile();
    const { userId } = await auth();

    if (error || !allUsers) {
        return (
            <div className="w-full h-full flex items-center justify-center text-lg text-slate-500 font-semibold bg-slate-950">
                <h1>Could not load leaderboard data.</h1>
            </div>
        );
    }

    // Identify Current User & Calculate Rank
    const sortedUsers = [...allUsers].sort((a, b) => (b.points || 0) - (a.points || 0));
    const rank = sortedUsers.findIndex(u => u.id === userId) + 1;
    
    const currentUser = allUsers.find(u => u.id === userId) || {};
    
    // Add calculated rank to user object
    const currentUserStats = {
        ...currentUser,
        rank: rank > 0 ? rank : "N/A",
        id: userId // Ensure ID match
    };

    return (
        <LeaderboardClient 
            allUsers={allUsers} 
            currentUserStats={currentUserStats} 
        />
    );
}