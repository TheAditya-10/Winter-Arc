import { 
    getUserProfileById, 
    getUserStatsById, 
    getActiveChallengeInfoByUserId, 
    getAllUserProfile 
} from "@/lib/dal/user"; // Points to your existing real DAL
import { auth } from "@clerk/nextjs/server";
import { Trophy, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import CountdownTimer from "@/components/ui/CountdownTimer"; // Adjusted path based on your screenshots

export default async function Page({ params }) {

    // --- 1. Resolve User ID Logic ---
    const resolvedParams = await params;
    let userId = resolvedParams.userId;
    const { userId: authedUserId } = await auth();
    
    if (userId === "me") userId = authedUserId;

    // --- 2. Data Fetching (Parallel for performance) ---
    const [
        userProfileRes, 
        userStatsRes, 
        activeChallengesRes,
        allUsersRes
    ] = await Promise.all([
        getUserProfileById(userId),
        getUserStatsById(userId),
        getActiveChallengeInfoByUserId(userId),
        getAllUserProfile()
    ]);

    // Extract Data
    const userProfile = userProfileRes.data;
    const userStats = userStatsRes.data;
    const activeChallenges = activeChallengesRes.data;
    const allUsers = allUsersRes.data;

    // Error Handling
    if (userProfileRes.error || userStatsRes.error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400">
                <Zap className="h-12 w-12 text-red-500 mb-4" />
                <h1 className="text-xl font-semibold">System Malfunction</h1>
                <p>Could not retrieve dashboard data.</p>
                <p className="text-sm mt-2">{userProfileRes.error?.message}</p>
            </div>
        );
    }

    // --- 3. Data Preparation ---
    const featuredChallenge = activeChallenges && activeChallenges.length > 0 ? activeChallenges[0] : null;

    // --- 4. Process Leaderboard Logic ---
    let leaderboardData = [];
    let userRank = 0;

    if (allUsers) {
        // Sort users by points (Highest first)
        const sortedUsers = allUsers.sort((a, b) => (b.points || 0) - (a.points || 0));
        
        // Find current user's rank
        userRank = sortedUsers.findIndex(u => u.id === userId) + 1;

        // Get Top 3
        leaderboardData = sortedUsers.slice(0, 3).map((u, index) => ({
            rank: index + 1,
            name: u.name || u.username || "Unknown",
            xp: `${u.points || 0}XP`,
            isMe: u.id === userId,
            avatar: u.avatarUrl
        }));

        // If user is not in top 3, add them at the bottom
        if (userRank > 3) {
            leaderboardData.push({
                rank: userRank,
                name: "You",
                xp: `${userStats?.points || 0}XP`,
                isMe: true,
                avatar: userProfile?.avatarUrl
            });
        }
    }

    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
                
                {/* Banner */}
                <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 mb-12 shadow-[0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                    <h1 className="text-center text-2xl md:text-3xl font-bold tracking-wider text-slate-100 uppercase drop-shadow-md">
                        Weekly Challenge is Live !!
                    </h1>
                </div>

                {/* Timeline Progress */}
                <div className="flex justify-center items-center gap-4 md:gap-12 mb-12 text-sm">
                    {[1, 2, 3, 4].map((week, idx) => (
                        <div key={week} className="flex flex-col items-center gap-2 relative group">
                            {idx !== 0 && <div className="absolute top-5 -left-[50%] w-full h-[2px] bg-slate-800 -z-10"></div>}
                            <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Week</span>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 
                                ${week === 2 
                                    ? "bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]" 
                                    : "bg-slate-900 border-slate-700 text-slate-500"}`}>
                                {week}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto pb-10">
                    
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        
                        {/* Challenge Card */}
                        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                            
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="relative shrink-0">
                                    <div className="w-24 h-24 rounded-full border-4 border-cyan-500/20 flex items-center justify-center bg-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                                        <div className="text-center">
                                            <div className="text-[10px] text-cyan-400 uppercase">Week</div>
                                            <div className="text-3xl font-bold text-white">2</div>
                                        </div>
                                    </div>
                                    <Zap className="absolute -top-1 -right-1 text-cyan-400 w-6 h-6 animate-pulse" />
                                </div>

                                <div className="flex-1 text-center md:text-left z-10">
                                    <h2 className="text-xl font-bold text-cyan-400 mb-2 uppercase tracking-wide">
                                        {featuredChallenge?.title || "No Active Challenge"}
                                    </h2>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                        {/* Your DAL only returns title/id, so we use a fallback description */}
                                        {featuredChallenge 
                                            ? "Dive into this week's task. Complete the objectives to earn XP and maintain your streak..." 
                                            : "Check back later for new challenges!"}
                                    </p>
                                    <Link href={featuredChallenge ? `/dashboard/challenges/${featuredChallenge.id}` : "#"}>
                                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold py-3 px-8 rounded-lg shadow-lg shadow-cyan-500/20 transition-all active:scale-95">
                                            {featuredChallenge ? "START NOW!" : "WAITING..."}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Countdown Timer */}
                        <CountdownTimer />

                        {/* Leaderboard */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-center font-bold text-lg uppercase tracking-widest mb-6 text-slate-300">Leaderboard</h3>
                            <div className="space-y-3">
                                {leaderboardData.map((entry, i) => (
                                    <div key={i} className={`flex items-center justify-between p-4 rounded-lg border 
                                        ${entry.isMe 
                                            ? "bg-slate-800/80 border-slate-600 shadow-md" 
                                            : "bg-slate-100/5 border-transparent text-slate-400"}`}>
                                        
                                        <span className="font-mono w-8">
                                            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                                        </span>
                                        
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-6 h-6 rounded-full bg-slate-700 overflow-hidden">
                                                <img 
                                                    src={entry.avatar || "https://github.com/shadcn.png"} 
                                                    alt={entry.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className={entry.isMe ? "font-bold text-white" : ""}>{entry.name}</span>
                                        </div>
                                        <span className="font-bold font-mono text-cyan-400">{entry.xp}</span>
                                    </div>
                                ))}
                                
                                {leaderboardData.length === 0 && (
                                    <div className="text-center text-slate-500 text-sm py-4">No data available</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Today's Focus */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-6">Today's Focus</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Current Streak</p>
                                    <div className="flex items-center gap-2">
                                        <Zap className="text-yellow-500 w-5 h-5 fill-yellow-500" />
                                        <span className="text-xl font-bold text-white">{userStats?.streakCount || 0} Days</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-white">Basics & Arrays</p>
                                    <p className="text-slate-400 text-sm">Submit by 11:59 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Rewards */}
                        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-6">
                                <Trophy className="w-5 h-5 text-cyan-400" />
                                <h3 className="text-lg font-bold text-white">Rewards</h3>
                            </div>
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between text-slate-300">
                                    <span>🥇 1st</span><span>Airpods</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>🥈 2nd</span><span>Watch</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>🥉 3rd</span><span>Accessories</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}