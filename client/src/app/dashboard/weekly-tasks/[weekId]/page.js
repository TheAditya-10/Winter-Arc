"use server"

import { TZDate } from "@date-fns/tz"
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const weekMap = {
    "week-one": "04",
    "week-two": "11",
    "week-three": "18",
    "week-four": "25",
}

function getWeekState(dayNumber) {
    const startTime = new TZDate(
        2026,
        0,                // January (0-based)
        Number(dayNumber),
        0, 0, 0,          // 00:00:00
        "Asia/Kolkata"
    ).getTime();
    const now = new TZDate(new Date(), "Asia/Kolkata").getTime();
    if (now - startTime < 0) return "upcoming";
    else if (now - startTime < 24 * 60 * 60 * 1000) return "active";
    else return "completed";
}

export default async function Page({ params }) {
    const { weekId } = await params

    if (!weekMap[weekId]) return notFound()

    const weekState = getWeekState(weekMap[weekId])

    if (weekState != "active") return redirect("/dashboard/weekly-tasks")

    return (
        <>
            <section className="pb-32 pt-10 font-poppins">
                <h1 className="text-foreground px-2 mb-10 text-center text-2xl font-bold tracking-tighter @sm/main:text-3xl">
                    Winter Arc: Build in 60
                </h1>

                <div className="font-inter">
                    <div className="mb-10 mx-auto w-76 @sm/main:w-96 @lg/main:w-[32rem] @2xl/main:w-[40rem] rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                        <h3 className="font-semibold text-center text-lg mb-1">Challenge Details</h3>
                        <div>
                            <div className="text-left mb-2">
                                <h3 className="font-medium flex items-center mb-2 mt-1">🧠 Challenge Idea</h3>
                                <ul className="list-disc pl-5 gap-2 text-sm flex flex-col">
                                    <li>
                                        Create anything meaningful in just 60 minutes that improves learning, productivity, creativity, or personal efficiency - based on your own experience or interest.
                                    </li>
                                    <li>
                                        This challenge focuses on execution under constraints, not perfection.
                                    </li>
                                </ul>
                            </div>
                            <div className="text-left mb-2">
                                <h3 className="font-medium flex items-center mb-2 mt-1">🎯 What Can Participants Build?</h3>
                                <p className="text-sm mb-2">Participants can choose any domain. Some examples (not limited to):</p>
                                <div className="grid grid-cols-1 gap-4 @sm/main:grid-cols-2">
                                    <div className="pl-5">
                                        <h2 className="font-medium flex items-center mb-2 mt-1">Tech / Coding</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                            <li>Python script / automation</li>
                                            <li>Mini website or landing page</li>
                                            <li>UI mockup / wireframe</li>
                                            <li>SQL queries / data analysis notebook</li>
                                        </ul>
                                    </div>
                                    <div className="pl-5">
                                        <h2 className="font-medium flex items-center mb-2 mt-1">Design / Content / Media</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                            <li>Canva poster or carousel</li>
                                            <li>Reel script or video idea</li>
                                            <li>Thumbnail or banner design</li>
                                            <li>Short-form content plan</li>
                                        </ul>
                                    </div>
                                    <div className="pl-5">
                                        <h2 className="font-medium flex items-center mb-2 mt-1">Academics / Productivity</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                            <li>Study timetable or revision strategy</li>
                                            <li>Notes system (Notion / Docs)</li>
                                            <li>Exam prep roadmap</li>
                                            <li>Flashcards or cheat sheets</li>
                                        </ul>
                                    </div>
                                    <div className="pl-5">
                                        <h2 className="font-medium flex items-center mb-2 mt-1">Fitness / Lifestyle / Others</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                            <li>Workout or diet plan</li>
                                            <li>Habit tracker</li>
                                            <li>Morning routine system</li>
                                            <li>Personal finance tracker</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center w-full justify-around mt-4">
                            <Link href={`/weekly-submit/${weekId}`}><Button>SUBMIT</Button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}