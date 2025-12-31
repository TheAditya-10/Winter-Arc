"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export const FeedbackOverlay = ({ isOpen, setIsOpen, messages, redirectUrl, aiFeedback, rejected, title, imgUrl }) => {
    const router = useRouter()

    const hasTask = messages?.task?.length > 0
    const hasStreak = messages?.streak?.length > 0

    const [step, setStep] = useState(() => {
        if (hasTask) return "task"
        if (hasStreak) return "streak"
        return null
    })

    const [showAiFeedback, setShowAiFeedback] = useState(false)

    useEffect(() => {
        if (hasTask) setStep("task")
        else if (hasStreak) setStep("streak")
    }, [hasTask, hasStreak])

    const onClose = redirectUrl && !rejected
        ? () => router.push(redirectUrl)
        : () => setIsOpen(false)

    if (!isOpen || (!step && !rejected)) return null

    const isTaskStep = step === "task"
    const messagesToShow = isTaskStep ? messages?.task : messages?.streak

    const handleContinue = () => {
        // If task is shown first and streak exists → go to streak
        if (isTaskStep && hasStreak) {
            setStep("streak")
            return
        }

        // Otherwise finish
        onClose()
    }


    return (
        <div className="z-100 font-inter fixed w-dvw h-dvh flex flex-col text-center items-center justify-center bg-[#0A0F1F] top-0 left-0 pb-24 gap-2 px-2">
            <Image
                src="/background.svg"
                fill
                alt="background image"
                className="object-cover opacity-20 -z-10"
            />


            {rejected
                ? (<>
                    <div className="bg-primary/20 rounded-full w-fit p-4">
                        <X size={40} />
                    </div>
                    <h1 className="text-xl font-semibold my-4">Submission Rejected!</h1>
                    <div className="text-[#777777] font-medium flex gap-2 w-full flex-wrap items-center justify-center">Your submission is rejected due to poor quality of content.<br/>Your conent may be irrelavant to task or not very descriptive.<br/>Read Ai feedback for more details.</div>
                </>)
                : (<>
                    <h1 className="text-xl font-bold">
                        {title || "MISSION SECURED ARC MAINTAINED"}
                    </h1>

                    <Image
                        src={imgUrl || `/dashboard/${isTaskStep ? "snow-flake" : "streak"}.svg`}
                        width={100}
                        height={100}
                        alt="image"
                    />
                    {messagesToShow.map((message, i) => (
                        <p
                            key={i}
                            className="text-[#777777] font-medium flex gap-2 w-full flex-wrap items-center justify-center"
                        >
                            {message.text}
                            <span className="text-[#FFC800] font-semibold">
                                {message.highlight}
                            </span>
                        </p>
                    ))}
                </>)
            }

            {aiFeedback && showAiFeedback && (<div className="bg-black/50 w-dvw h-dvh fixed z-100 flex items-center justify-center flex-col backdrop-blur-sm top-0">
                <div className="max-w-[32rem] text-card-foreground px-2">
                    <h3 className="my-4 leading-none font-semibold text-center">AI Feedback</h3>
                    <div className="bg-card mb-4 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-6 shadow-sm max-h-64 overflow-y-auto font-mono text-sm scrollbar-thin">
                        {aiFeedback}
                    </div>
                    <button
                        className="bg-[#5381B2] shadow-[0_4px_0_0_#2965A4] text-white rounded-lg px-4 py-1 font-semibold text-sm"
                        onClick={() => setShowAiFeedback(false)}
                    >
                        close
                    </button>
                </div>
            </div>
            )}

            <div className="fixed bottom-0 h-24 bg-[#8ACADE] w-full flex items-center justify-evenly">
                {aiFeedback && (<button
                    className="bg-[#5381B2] shadow-[0_4px_0_0_#2965A4] text-white rounded-lg px-4 py-1 font-semibold text-sm"
                    onClick={() => setShowAiFeedback(true)}
                >
                    Ai Feedback
                </button>)}
                <button
                    className="bg-[#5381B2] shadow-[0_4px_0_0_#2965A4] text-white rounded-lg px-4 py-1 font-semibold text-sm"
                    onClick={handleContinue}
                >
                    {rejected ? "Try Again":"Continue"}
                </button>
            </div>
        </div>
    )
}