"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Timer } from "@/components/timer"
import { ButtonGroup } from "./ui/button-group"
import { useState } from "react"
import FinalSubmissionDetails from "./final-submission-details"
import { FinalSubmissionLeaderboard, finalLeadearboardColumns, UserSubmissionCard } from "./final-submission-leaderboard"

export default function FinalSubmissionPage({allSubmissions, userSubmission}) {

    const [tab, setTab] = useState("detail")

    return (
        <>
            <section className="font-poppins mx-auto w-76 @sm/main:w-96 @lg/main:w-[32rem] @2xl/main:w-[40rem]">
                <div className="flex items-center justify-center @max-sm/main:scale-80 py-4 gap-2 text-sm">
                    <ButtonGroup>
                        <Button
                            variant={tab == "detail" ? "secondary" : "ghost"}
                            onClick={() => tab == "detail" || setTab("detail")}
                        >DETAIL</Button>
                        <Button
                            variant={tab == "leaderboard" ? "secondary" : "ghost"}
                            onClick={() => tab == "leaderboard" || setTab("leaderboard")}
                        >LEADERBOARD</Button>
                        <Button
                            variant={tab == "your-submission" ? "secondary" : "ghost"}
                            onClick={() => tab == "your-submission" || setTab("your-submission")}
                        >YOUR SUBMISSION</Button>
                    </ButtonGroup>
                </div>

                {tab == "detail" && <FinalSubmissionDetails userSubmissions={userSubmission}/>}
                {tab == "your-submission" && <UserSubmissionCard submission={userSubmission}/>}
                {tab == "leaderboard" && <FinalSubmissionLeaderboard data={allSubmissions} columns={finalLeadearboardColumns}/>}
            </section>
        </>
    )
}