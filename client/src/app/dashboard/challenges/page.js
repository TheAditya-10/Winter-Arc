"use server"

import Link from "next/link";
import { getAllChallenges } from "@/lib/dal/challenge";
import { getActiveChallengeId } from "@/lib/dal/user";
import { Lock, BookOpen, ChevronRight } from "lucide-react";

// Helper to group challenges into chunks of 7 (Weeks)
const groupChallengesByWeek = (challenges) => {
    const weeks = [];
    let currentWeek = [];
    
    // Safety check if challenges is null/undefined
    if (!challenges) return [];

    challenges.forEach((challenge, index) => {
        currentWeek.push(challenge);
        // Push to weeks array if we hit 7 days or it's the last challenge
        if (currentWeek.length === 7 || index === challenges.length - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });
    return weeks;
};

const ChallengesPage = async () => {
    
    // --- 1. EXISTING BACKEND LOGIC ---
    const { data: challenges, error } = await getAllChallenges();

    if (error) {
        console.error(error);
        return (
            <div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold">
                <h1>Something went wrong loading challenges!!</h1>
            </div>
        );
    }

    const { data: userActiveChallengeMap, error: userActiveChallengeMapError } = await getActiveChallengeId();

    if (userActiveChallengeMapError) {
        console.error(userActiveChallengeMapError);
        return (
            <div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold">
                <h1>Something went wrong loading user data!!</h1>
            </div>
        );
    }

    // --- 2. PREPARE DATA FOR TIMELINE ---
    const weeks = groupChallengesByWeek(challenges);
    
    // Quotes for the UI headers
    const weekQuotes = [
        "The cold doesn't care about your excuses. Lock In.",
        "Most people are hibernating. This is where you pull ahead.",
        "Motivation gets you started. The Arc keeps you going.",
        "It's easier to keep the fire going than to rekindle it from the ash.",
        "Finish Strong."
    ];

    return (
        // --- 3. LAYOUT: Fixed Header + Scrollable Content ---
        <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30">
            
            {/* Header (Fixed at top) */}
            <div className="flex-none px-6 py-6 pb-2">
                <h1 className="text-2xl font-bold text-white uppercase tracking-wider font-mono">
                    Daily Challenges
                </h1>
            </div>

            {/* Scrollable Timeline Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-10 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
                    
                    {/* --- LEFT COLUMN: TIMELINE (Span 8) --- */}
                    <div className="lg:col-span-8 space-y-8">
                        {weeks.map((weekChallenges, weekIndex) => (
                            <div key={weekIndex} className="relative">
                                
                                {/* Week Header Card */}
                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex justify-between items-center mb-6 sticky top-0 z-10 backdrop-blur-md shadow-lg">
                                    <div>
                                        <h2 className="text-lg font-bold text-white uppercase">
                                            {weekIndex === 4 ? "Final Days" : `Week ${weekIndex + 1}`}
                                        </h2>
                                        <p className="text-xs text-slate-400 italic mt-1">
                                            "{weekQuotes[weekIndex] || "Keep pushing forward."}"
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                                        <BookOpen className="w-3 h-3" /> GUIDEBOOK
                                    </button>
                                </div>

                                {/* Timeline Nodes */}
                                <div className="ml-4 md:ml-8 relative pb-8">
                                    {/* Vertical Connecting Line */}
                                    <div className="absolute left-[19px] top-4 bottom-0 w-0.5 bg-slate-800/50 -z-10"></div>

                                    <div className="space-y-6">
                                        {weekChallenges.map((challenge, i) => {
                                            // Check if user has registered for this challenge using your Map
                                            const isRegistered = userActiveChallengeMap?.get(challenge.id);
                                            
                                            // UI Logic: 
                                            // Registered = Blue Active Node
                                            // Not Registered = Grey/Locked Node
                                            
                                            return (
                                                <Link 
                                                    href={`/dashboard/challenges/${challenge.id}`} 
                                                    key={challenge.id}
                                                    className="group flex items-center gap-6 relative"
                                                >
                                                    {/* Node Circle */}
                                                    <div className={`
                                                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 z-10 transition-all duration-300
                                                        ${isRegistered 
                                                            ? "bg-cyan-500 border-cyan-950 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110" 
                                                            : "bg-slate-800 border-slate-600 text-slate-400 hover:border-cyan-500 hover:text-cyan-400"
                                                        }
                                                    `}>
                                                        {/* Display Day Number (Global Index + 1) */}
                                                        {(weekIndex * 7) + i + 1}
                                                    </div>

                                                    {/* Challenge Info Card */}
                                                    <div className={`
                                                        px-4 py-3 rounded-lg border flex-1 transition-all
                                                        ${isRegistered
                                                            ? "bg-slate-900/80 border-cyan-500/30 shadow-lg"
                                                            : "bg-transparent border-transparent group-hover:bg-slate-900 group-hover:border-slate-800"
                                                        }
                                                    `}>
                                                        <h3 className={`font-bold text-sm ${isRegistered ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"}`}>
                                                            {challenge.title}
                                                        </h3>
                                                        {isRegistered && (
                                                            <span className="text-[10px] text-green-500 font-mono mt-1 block">IN PROGRESS</span>
                                                        )}
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- RIGHT COLUMN: SIDEBAR (Span 4) --- */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* 1. Unlock Leaderboards Card */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                            <h3 className="font-bold text-white mb-2">Unlock Leaderboards!</h3>
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <Lock className="w-4 h-4 text-orange-500" />
                                <span>Complete 2 days streak to start competing</span>
                            </div>
                        </div>

                        {/* 2. Flake Point Progress (Mock visual matching reference) */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 h-48 flex flex-col">
                            <h3 className="font-bold text-white mb-4">Flake Point Progress</h3>
                            <div className="flex-1 flex items-end justify-between px-2 gap-2">
                                {/* Visual Bars */}
                                {['M','T','W','Th','F','Sa','Su'].map((day) => (
                                    <div key={day} className="flex flex-col items-center gap-2 w-full">
                                        <div className="w-full bg-slate-800 rounded-t-sm hover:bg-cyan-500/50 transition-colors" style={{height: `${Math.random() * 60 + 20}%`}}></div>
                                        <span className="text-[10px] text-slate-500">{day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Previous Challenges Link */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                            <h3 className="font-bold text-white mb-4">Previous Challenges</h3>
                            <button className="w-full py-2 text-xs font-bold text-slate-500 border border-slate-800 rounded hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-1">
                                VIEW DETAILED SUBMISSIONS <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengesPage;