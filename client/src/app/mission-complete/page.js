"use client";

import { useRouter } from "next/navigation";
import { Snowflake } from "lucide-react";
import { motion } from "framer-motion";

export default function MissionComplete() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans relative selection:bg-cyan-500/30">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full max-w-4xl"
        >
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono font-bold text-2xl md:text-4xl tracking-[0.2em] mb-12 text-white uppercase drop-shadow-lg"
          >
            MISSION SECURED ARC MAINTAINED
          </motion.h1>

          {/* Snowflake Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="mb-12 flex justify-center"
          >
            <div className="relative inline-block">
              <Snowflake 
                className="w-32 h-32 md:w-40 md:h-40 text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-pulse"
                strokeWidth={1.5}
              />
              {/* Glow effect */}
              <div className="absolute inset-0 blur-2xl bg-cyan-500/30 rounded-full" />
            </div>
          </motion.div>

          {/* XP Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xl text-slate-400">
              Challenge Complete! <span className="text-yellow-400 font-bold ml-2 text-shadow">+50 XP</span>
            </p>
            <p className="text-lg text-slate-500">
              "10-Day Consistency Detected" : <span className="text-yellow-400 font-bold ml-2">+150 XP BONUS</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom Bar */}
      <motion.div 
         initial={{ y: 50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.8 }}
         className="w-full bg-slate-900/80 backdrop-blur-md border-t border-slate-800 p-4 z-20"
      >
        <div className="max-w-6xl mx-auto flex justify-end">
            <button
                onClick={() => router.push("/dashboard/me")}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm md:text-base px-8 py-3 rounded-lg shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
            >
                CONTINUE
            </button>
        </div>
      </motion.div>
    </div>
  );
}