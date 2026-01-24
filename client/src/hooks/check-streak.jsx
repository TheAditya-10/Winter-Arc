"use client"
import { useEffect, useState } from "react"
import { checkStreak } from "@/app/actions"
import { toast } from "sonner"

export default function useCheckStreak(initialStats, isMe) {

    const [stats, setStats] = useState(initialStats)
    const [streakState, setStreakState] = useState("")

    useEffect(() => {
        const run = async () => {
            const { error, errorMessage, state, userStats, messages } = await checkStreak()

            if (userStats) setStats({ ...initialStats, ...userStats })
            
            let title = "MILESTONE BONUCE"

            if (state == "reset") {
                title = "STREAK BROKEN"
            } else if (state == "freeze") {
                title = "STREAK FREEZED"
            }

            if(messages?.task?.length || messages?.streak?.length) setStreakState({ messages, title, state})
            console.log(messages)

            if (error) {
                return toast.error(errorMessage)
            }
        }
        if (isMe) run()
    }, [])

    return { stats, streakState, setStreakState };
}