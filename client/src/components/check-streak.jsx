"use client"
import { useEffect } from "react"
import { checkStreak } from "@/app/actions"
import { toast } from "sonner"

export default function CheckStreak() {

    useEffect(() => {
        const run = async () => {
            const { error, message, reset } = await checkStreak()
            if (error || reset) {
                return toast.error(message)
            } else {
                return toast.success(message)
            }
        }
        run()
    }, [])

    return null;
}