"use server"

import { TZDate } from "@date-fns/tz"
import Link from "next/link"
import { Lock, Activity, Check, ChevronRight, Trophy } from "lucide-react"

export default async function WeeklyTasksPage() {

    // --- 1. EXISTING LOGIC (Preserved) ---
    const titles = ["Week One", "Week Two", "Week Three", "Week Four"];
    const quotes = [
        "The foundation is built in the first steps.",
        "Consistency is the killer of dreams... or the creator.",
        "You are halfway to becoming unrecognizable.",
        "Finish what you started. Leave no doubt."
    ];

    // Dates from your code (2026-01-XX)
    const weeklyTaskStartTime = ["04", "11", "18", "25"].map((dayNumber) => 
        new TZDate(new Date(`2026-01-${dayNumber}T00:00:00`), "Asia/Calcutta").getTime()
    );

    const weeklyTaskState = weeklyTaskStartTime.map((startTime) => {
        const now = new TZDate(new Date(), "Asia/Calcutta").getTime();
        if (now - startTime < 0) return "upcoming";
        else if (now - startTime < 24 * 60 * 60 * 1000) return "active";
        else return "completed";
    });

    // Calculate progress for the sidebar
    const completedCount = weeklyTaskState.filter(s => s === "completed").length;
    const progressPercentage = (completedCount / 4) * 100;

    return (
        // --- 2. LAYOUT: Fixed Header + Scrollable Content ---
        <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30">
            
            {/* Header */}
            <div className="flex-none px-6 py-6 pb-2">
                <h1 className="text-2xl font-bold text-white uppercase tracking-wider font-mono">
                    Weekly Missions
                </h1>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 pb-10 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto mt-4">
                    
                    {/* --- LEFT COLUMN: TIMELINE (Span 8) --- */}
                    <div className="lg:col-span-8 relative min-h-[500px]">
                        
                        {/* Vertical Connecting Line */}
                        <div className="absolute left-[28px] top-6 bottom-12 w-1 bg-slate-800/50 -z-10 rounded-full"></div>

                        <div className="space-y-12">
                            {titles.map((title, i) => {
                                const state = weeklyTaskState[i]; // 'upcoming' | 'active' | 'completed'
                                const linkHref = `/dashboard/weekly-tasks/${title.replace(" ", "-").toLowerCase()}`;
                                
                                return (
                                    <div key={title} className="relative group">
                                        
                                        <div className="flex items-start gap-6">
                                            
                                            {/* 1. NODE CIRCLE */}
                                            <div className={`
                                                relative shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 z-10
                                                ${state === 'active' 
                                                    ? "bg-slate-900 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-110" 
                                                    : state === 'completed'
                                                        ? "bg-slate-900 border-green-500/50 text-green-500"
                                                        : "bg-slate-950 border-slate-800 text-slate-600"
                                                }
                                            `}>
                                                {state === 'active' && <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />}
                                                {state === 'completed' && <Check className="w-6 h-6" />}
                                                {state === 'upcoming' && <Lock className="w-5 h-5" />}

                                                {/* Connecting Dot Overlay for Active */}
                                                {state === 'active' && (
                                                    <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur-lg -z-10 animate-pulse"></div>
                                                )}
                                            </div>

                                            {/* 2. CARD CONTENT */}
                                            <div className="flex-1">
                                                {state === 'upcoming' ? (
                                                    // Locked Card
                                                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 opacity-60">
                                                        <h3 className="text-xl font-bold text-slate-500 mb-1">{title}</h3>
                                                        <p className="text-sm text-slate-600 font-mono">Unlocks on {new Date(weeklyTaskStartTime[i]).toLocaleDateString()}</p>
                                                    </div>
                                                ) : (
                                                    // Active/Completed Card (Clickable)
                                                    <Link href={linkHref} className="block">
                                                        <div className={`
                                                            rounded-xl p-6 border transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1
                                                            ${state === 'active'
                                                                ? "bg-gradient-to-r from-slate-900 to-slate-800 border-cyan-500/50 shadow-lg group-hover:shadow-cyan-900/20"
                                                                : "bg-slate-900/60 border-green-900/30 hover:bg-slate-900"
                                                            }
                                                        `}>
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h3 className={`text-xl font-bold ${state === 'active' ? "text-white" : "text-slate-300"}`}>
                                                                    {title}
                                                                </h3>
                                                                {state === 'active' && (
                                                                    <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
                                                                        Current Mission
                                                                    </span>
                                                                )}
                                                            </div>
                                                            
                                                            <p className="text-slate-400 text-sm italic mb-4">"{quotes[i]}"</p>

                                                            <div className="flex items-center text-sm font-medium gap-2">
                                                                <span className={state === 'active' ? "text-cyan-400" : "text-green-500"}>
                                                                    {state === 'active' ? "START MISSION" : "VIEW STATS"}
                                                                </span>
                                                                <ChevronRight className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: SIDEBAR (Span 4) --- */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Overall Progress Card */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-500" /> Arc Progress
                            </h3>
                            
                            <div className="mb-2 flex justify-between text-sm text-slate-400">
                                <span>{completedCount} / 4 Weeks</span>
                                <span>{progressPercentage}%</span>
                            </div>
                            
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6">
                            <h4 className="text-blue-400 font-bold mb-2 text-sm uppercase">Mission Brief</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Each week unlocks a new set of high-leverage tasks. Completing these is mandatory to maintain your streak and maximize your XP multiplier.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}