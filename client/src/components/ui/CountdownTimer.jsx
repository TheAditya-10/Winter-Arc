// components/CountdownTimer.js
"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 5, seconds: 11 })

  useEffect(() => {
    // Set a target time for 12 hours from now (simulated for demo)
    const target = new Date()
    target.setHours(target.getHours() + 12)
    target.setMinutes(target.getMinutes() + 5)

    const interval = setInterval(() => {
      const now = new Date()
      const diff = target - now

      if (diff <= 0) {
        clearInterval(interval)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      } else {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        const seconds = Math.floor((diff / 1000) % 60)
        setTimeLeft({ hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Helper to ensure 2 digits
  const f = (n) => String(n).padStart(2, "0")

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative">
      <div className="flex items-center gap-2 text-cyan-400 mb-4">
        <Clock className="w-5 h-5" />
        <span className="font-semibold tracking-wider">Ends in :</span>
      </div>
      
      <div className="text-4xl md:text-5xl font-mono font-bold text-white tracking-widest tabular-nums flex gap-4">
        <div>
          {f(timeLeft.hours)}
          <span className="text-xs block text-center text-slate-600 font-sans mt-1">Hours</span>
        </div>
        <span className="text-slate-700">:</span>
        <div>
          {f(timeLeft.minutes)}
          <span className="text-xs block text-center text-slate-600 font-sans mt-1">Mins</span>
        </div>
        <span className="text-slate-700">:</span>
        <div className="text-cyan-400">
          {f(timeLeft.seconds)}
          <span className="text-xs block text-center text-slate-600 font-sans mt-1">Sec</span>
        </div>
      </div>
      
      <p className="text-slate-600 text-xs mt-4">("Submissions close automatically")</p>
    </div>
  )
}