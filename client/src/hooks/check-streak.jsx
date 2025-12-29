"use client"
import { useEffect, useState } from "react"
import { checkStreak } from "@/app/actions"
import { toast } from "sonner"

export default function useCheckStreak(initialStats, isMe) {

    const [stats, setStats] = useState(initialStats)

    useEffect(() => {
        const run = async () => {
            const { error, message, reset, userStats } = await checkStreak()

            if (userStats) setStats({ ...initialStats, ...userStats })
            if (error || reset) {
                return toast.error(message)
            } 
            // else {
            //     return toast.success(message)
            // }
        }
        if(isMe) run()
    }, [])

    return { stats };
}