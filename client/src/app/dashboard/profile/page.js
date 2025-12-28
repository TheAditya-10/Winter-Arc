"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Flame, 
  Zap, 
  Snowflake, 
  Trophy, 
  ChevronRight, 
  Clock, 
  Users, 
  Pencil 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const challengeOptions = ['PYTHON', 'HEALTH & GYM', 'WEB DEVELOPMENT', 'WEB 3'];

const milestones = [
  { id: 1, title: '7-Day Streak', progress: 5, total: 7, desc: 'Reach a 7 day streak', color: 'from-orange-500 to-red-500', icon: '🔥' },
  { id: 2, title: '14-Day Consistency', progress: 5, total: 14, desc: 'Earn 100 XP', color: 'from-cyan-500 to-blue-500', icon: '💎' },
  { id: 3, title: '30-Day ARC Completed', progress: 5, total: 30, desc: '', color: 'from-green-500 to-emerald-500', icon: '🏆' },
];

export default function ProfilePage() {
  const router = useRouter();
  const [selectedChallenge, setSelectedChallenge] = useState('PYTHON');

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* === LEFT COLUMN: MAIN CONTENT (Span 2) === */}
            <div className="lg:col-span-2">
              
              {/* Profile Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-5xl overflow-hidden border-4 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <span role="img" aria-label="avatar">👽</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="font-mono font-bold text-2xl text-white tracking-wide">ARYAN SHUKLA</h1>
                      <p className="text-slate-400">@bacchahoonmai69</p>
                    </div>
                    <Button 
                      onClick={() => router.push('/dashboard/settings')}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Pencil className="w-4 h-4" />
                      EDIT PROFILE
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Joined January 1st</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>0 Following / 0 Followers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <span className="text-lg font-semibold text-white">Participated Challenges :</span>
                <div className="w-full sm:w-48">
                  <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
                    <SelectTrigger className="bg-slate-900 border-slate-800 text-white focus:ring-cyan-500/50">
                      <SelectValue placeholder="Select Challenge" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-300">
                      {challengeOptions.map((opt) => (
                        <SelectItem key={opt} value={opt} className="focus:bg-slate-800 focus:text-cyan-400">
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Statistics Grid */}
              <h2 className="font-mono font-bold text-xl mb-4 text-white uppercase tracking-wider">Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatsCard icon={<Flame className="w-6 h-6 text-orange-500" />} value="0" label="Day Streak" />
                <StatsCard icon={<Zap className="w-6 h-6 text-yellow-400" />} value="27" label="Total XP" />
                <StatsCard icon={<Snowflake className="w-6 h-6 text-cyan-400" />} value="0" label="Freezes Used" />
                <StatsCard icon={<Trophy className="w-6 h-6 text-yellow-500" />} value="0" label="Weekly Wins" />
              </div>

              {/* Submissions Card */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="font-semibold text-white">Total Submissions</span>
                  <span className="text-slate-400">5/30</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2 relative z-10">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '16.6%' }} />
                </div>
                <p className="text-sm text-slate-500 mb-6 relative z-10">Reach a 7 day streak</p>

                <div className="space-y-4 relative z-10">
                  <SubmissionRow label="On time submissions" value="5/14" />
                  <SubmissionRow label="Late submissions" value="5/30" />
                  <SubmissionRow label="Missed submissions" value="5/30" />
                </div>

                <button className="w-full mt-6 py-2 flex items-center justify-between text-slate-400 hover:text-cyan-400 transition-colors border-t border-slate-800 pt-4 relative z-10">
                  <span className="text-sm font-medium">View all details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Milestones */}
              <h2 className="font-mono font-bold text-xl mb-4 text-white uppercase tracking-wider">Milestones</h2>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-slate-700 transition-colors">
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br shadow-lg",
                      milestone.color
                    )}>
                      <span className="text-2xl drop-shadow-md">{milestone.icon}</span>
                      <span className="text-[10px] font-bold text-white/90">LEVEL 1</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-200">{milestone.title}</span>
                        <span className="text-xs text-slate-500 font-mono">{milestone.progress}/{milestone.total}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                          style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}
                        />
                      </div>
                      {milestone.desc && (
                        <p className="text-xs text-slate-500 mt-2">{milestone.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* === RIGHT COLUMN: SIDEBAR (Span 1) === */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-0 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                <h2 className="font-mono font-bold text-lg mb-6 text-center text-white border-b border-slate-800 pb-4">
                  Winter Arc Status
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">Tier :</span>
                    <span className="font-bold text-cyan-400 drop-shadow-sm">Glacier</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Current Day :</span>
                    </div>
                    <span className="font-mono font-bold text-white">14 / 30</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                      <span>Active Challenge :</span>
                    </div>
                    <span className="font-bold text-white uppercase">{selectedChallenge}</span>
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

// --- Helper Components ---

function StatsCard({ icon, value, label }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 hover:bg-slate-900 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xl font-bold text-white">{value}</span>
      </div>
      <p className="text-[10px] text-slate-500 uppercase font-medium tracking-wide">{label}</p>
    </div>
  );
}

function SubmissionRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-sm font-mono text-slate-500">{value}</span>
    </div>
  );
}