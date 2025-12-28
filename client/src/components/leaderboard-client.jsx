"use client";

import { useState } from "react";
import { Search, Zap, Clock, Flame, Snowflake, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeaderboardClient({ allUsers, currentUserStats }) {
  const [activeTab, setActiveTab] = useState("global");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Sort & Filter Data
  const sortedUsers = [...allUsers].sort((a, b) => {
    const xpA = (activeTab === "weekly" ? a.weeklyPoints : a.points) || 0;
    const xpB = (activeTab === "weekly" ? b.weeklyPoints : b.points) || 0;
    return xpB - xpA;
  });

  const filteredUsers = sortedUsers.filter((u) =>
    (u.name || "Unknown").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Separate Podium (Top 3) vs List
  const topThree = [
    filteredUsers[1], // 2nd Place (Left)
    filteredUsers[0], // 1st Place (Center)
    filteredUsers[2], // 3rd Place (Right)
  ];

  const listData = filteredUsers.slice(3);

  // Helper to safely get XP
  const getXp = (user) => (activeTab === "weekly" ? user.weeklyPoints : user.points) || 0;

  return (
    // LAYOUT FIX: Fixed Height Container prevents window scroll
    <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col">
      
      {/* SCROLLABLE AREA: Only this div scrolls */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
             <h1 className="font-mono font-bold text-3xl tracking-wider text-white uppercase hidden md:block">
                Leaderboard
             </h1>
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search Student"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm placeholder:text-slate-600 transition-all"
                />
             </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* === LEFT COLUMN: MAIN LEADERBOARD === */}
            <div className="lg:col-span-2">
              
              {/* Tabs */}
              <div className="flex justify-center mb-10">
                <div className="inline-flex rounded-full bg-slate-900 p-1 border border-slate-800">
                  <button
                    onClick={() => setActiveTab("global")}
                    className={cn(
                      "px-8 py-2 rounded-full text-sm font-bold transition-all",
                      activeTab === "global"
                        ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Global
                  </button>
                  <button
                    onClick={() => setActiveTab("weekly")}
                    className={cn(
                      "px-8 py-2 rounded-full text-sm font-bold transition-all",
                      activeTab === "weekly"
                        ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Weekly
                  </button>
                </div>
              </div>

              {/* Top 3 Podium */}
              <div className="flex items-end justify-center gap-4 md:gap-8 mb-12 h-60 md:h-72">
                
                {/* 2nd Place */}
                {topThree[0] && (
                  <div className="flex flex-col items-center group relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-blue-500 p-1 bg-slate-900 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                      <img src={topThree[0].avatarUrl || "https://github.com/shadcn.png"} alt="" className="w-full h-full rounded-full object-cover"/>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm shadow-md border-2 border-slate-900">
                        2
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="font-bold text-white text-sm md:text-base truncate max-w-[100px]">{topThree[0].name}</h3>
                        <span className="text-blue-400 font-bold text-sm block">{getXp(topThree[0])}</span>
                        <span className="text-xs text-slate-500">@{topThree[0].username || "user"}</span>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {topThree[1] && (
                  <div className="flex flex-col items-center -mt-12 z-20 scale-110">
                    <Snowflake className="w-8 h-8 text-amber-400 mb-2 animate-bounce duration-[2000ms]" fill="currentColor" />
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-amber-400 p-1 bg-slate-900 relative shadow-[0_0_50px_rgba(251,191,36,0.4)]">
                       <img src={topThree[1].avatarUrl || "https://github.com/shadcn.png"} alt="" className="w-full h-full rounded-full object-cover"/>
                       <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center font-bold text-slate-950 text-base shadow-lg border-4 border-slate-900">
                        1
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                        <h3 className="font-bold text-white text-base md:text-lg truncate max-w-[140px]">{topThree[1].name}</h3>
                        <span className="text-amber-400 font-bold text-base block">{getXp(topThree[1])}</span>
                        <span className="text-xs text-slate-500">@{topThree[1].username || "user"}</span>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-green-500 p-1 bg-slate-900 relative z-10 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                       <img src={topThree[2].avatarUrl || "https://github.com/shadcn.png"} alt="" className="w-full h-full rounded-full object-cover"/>
                       <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center font-bold text-white text-sm shadow-md border-2 border-slate-900">
                        3
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="font-bold text-white text-sm md:text-base truncate max-w-[100px]">{topThree[2].name}</h3>
                        <span className="text-green-400 font-bold text-sm block">{getXp(topThree[2])}</span>
                        <span className="text-xs text-slate-500">@{topThree[2].username || "user"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 px-6 py-3 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-800/50 mb-2">
                <span className="col-span-1">#Rank</span>
                <span className="col-span-4 pl-2">Name</span>
                <span className="col-span-3 text-center">Streak</span>
                <span className="col-span-2 text-center">XP Earned</span>
                <span className="col-span-2 text-right">Tier</span>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {listData.map((user, index) => {
                  const rank = index + 4;
                  const isYou = user.id === currentUserStats.id;

                  return (
                    <div
                      key={user.id}
                      className={cn(
                        "grid grid-cols-12 gap-2 items-center px-6 py-4 rounded-xl transition-all border group",
                        isYou
                          ? "bg-slate-800 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.01]"
                          : "bg-slate-900/40 border-slate-800 hover:bg-slate-800/60"
                      )}
                    >
                      <span className={`col-span-1 font-mono font-bold text-sm ${isYou ? "text-cyan-400" : "text-slate-500"}`}>
                        #{rank}
                      </span>
                      
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
                           <img src={user.avatarUrl || "https://github.com/shadcn.png"} alt="" className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-sm font-bold truncate max-w-[120px] ${isYou ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                              {user.name}
                            </span>
                            <span className="text-[10px] text-slate-600 hidden md:block">0201AI241017</span>
                        </div>
                      </div>

                      <span className="col-span-3 text-center text-xs text-slate-500 font-mono">
                         {user.streakCount || "0201..."}
                      </span>

                      <span className={`col-span-2 text-center font-bold text-sm ${getXp(user) > 0 ? "text-amber-400" : "text-slate-600"}`}>
                         {getXp(user)}XP
                      </span>

                      <span className="col-span-2 text-right text-xs text-slate-500 font-bold uppercase">
                        AI
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* === RIGHT COLUMN: YOUR STATUS CARD === */}
            <div className="lg:col-span-1">
               <div className="sticky top-0 space-y-6">
                  
                  {/* Status Card (Matches screenshot design) */}
                  <div className="bg-slate-900 border border-blue-900/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(59,130,246,0.05)] relative overflow-hidden">
                      {/* Glow effect */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                      
                      <h2 className="font-mono font-bold text-sm mb-6 text-cyan-400 uppercase tracking-widest border-b border-blue-900/30 pb-4">
                          Your Competition Status
                      </h2>

                      {/* Profile */}
                      <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 rounded-full border-2 border-cyan-500/50 p-0.5">
                              <img src={currentUserStats.avatarUrl || "https://github.com/shadcn.png"} className="w-full h-full rounded-full object-cover"/>
                          </div>
                          <div>
                              <h3 className="font-bold text-white text-base">{currentUserStats.name}</h3>
                              <span className="text-xs text-slate-500 block">@{currentUserStats.username}</span>
                          </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                              <Zap className="w-4 h-4 text-amber-400 mb-1" />
                              <div className="text-lg font-bold text-white">{currentUserStats.points || 0}</div>
                              <div className="text-[10px] text-slate-500 font-medium">Total XP</div>
                          </div>
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                              <Clock className="w-4 h-4 text-cyan-400 mb-1" />
                              <div className="text-lg font-bold text-white">Day 13</div>
                              <div className="text-[10px] text-slate-500 font-medium">Current Day</div>
                          </div>
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                              <Flame className="w-4 h-4 text-orange-500 mb-1" />
                              <div className="text-lg font-bold text-white">{currentUserStats.weeklyPoints || 0}</div>
                              <div className="text-[10px] text-slate-500 font-medium">This Week</div>
                          </div>
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                              <Snowflake className="w-4 h-4 text-blue-400 mb-1" />
                              <div className="text-lg font-bold text-white">{currentUserStats.streakCount || 0}</div>
                              <div className="text-[10px] text-slate-500 font-medium">Streak</div>
                          </div>
                      </div>

                      {/* Footer Info */}
                      <div className="space-y-3 pt-4 border-t border-slate-800">
                          <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-500">Global Rank</span>
                              <span className="text-white font-mono font-bold">#{currentUserStats.rank || "N/A"}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-500">Tier</span>
                              <span className="text-white font-bold">Glacier</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-500">Streak ID</span>
                              <span className="text-slate-400 text-xs font-mono">{currentUserStats.username}</span>
                          </div>
                      </div>
                  </div>

               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}