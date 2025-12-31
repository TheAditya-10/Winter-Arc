"use client"
import { useEffect, useState } from "react"
import { checkStreak } from "@/app/actions"
import { toast } from "sonner"

export default function useCheckStreak(initialStats, isMe) {

    const [stats, setStats] = useState(initialStats)
    const [streakState, setStreakState] = useState("")

    useEffect(() => {
        const run = async () => {
            const { error, message, state, userStats } = await checkStreak()

            if (userStats) setStats({ ...initialStats, ...userStats })
            if(state){
                if(state == "reset"){
                    const messages = {streak: [
                        {text: "You've missed a day", highlight: "-50 XP"},
                        {text: "Previous Streak", highlight: `${initialStats.streakCount} Day`},
                        {text: "Current Streak", highlight: `0 Day`},
                    ]}

                    const title = "STREAK BROKEN"

                    const url = "/dashboard/streak-broken.svg"

                    setStreakState({messages, title, url})
                }
                if(state == "freeze"){
                    const messages = {streak: [
                        {text: "Streak Freeze Left:", highlight: `${userStats.streakFreezeCount}`},
                        {text: "Current Streak", highlight: `${userStats.streakCount} Day`},
                    ]}

                    const title = "STREAK Freeze Is Used"

                    const url = "/dashboard/streak-freeze.svg"

                    setStreakState({messages, title, url})
                }
            }
            if (error) {
                return toast.error(message)
            }
        }
        if(isMe) run()
    }, [])

    return { stats, streakState, setStreakState };
}