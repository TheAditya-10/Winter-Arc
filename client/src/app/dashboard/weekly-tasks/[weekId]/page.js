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

    const weekContent = {
        "week-one": {
            title: "Winter Arc: Build in 60",
            content: "week-one"
        },
        "week-two": {
            title: "✨ Glow-Up Anything ✨",
            subtitle: "From Cold & Ordinary → Polished & Powerful",
            content: "week-two"
        },
        "week-three": {
            title: "🧊 Icebreak - The Unlearn Task",
            subtitle: "Break what no longer serves. Keep what survives the cold.",
            content: "week-three"
        },
        "week-four": {
            title: "🔥 THE WINTER MANIFESTO",
            subtitle: "When winter ends, you don't go back the same.",
            content: "week-four"
        }
    }

    return (
        <>
            <section className="pb-32 pt-10 font-poppins">
                <h1 className="text-foreground px-2 mb-6 text-center text-2xl font-bold tracking-tighter @sm/main:text-3xl">
                    {weekContent[weekId]?.title || "Weekly Challenge"}
                </h1>
                {weekContent[weekId]?.subtitle && (
                    <p className="text-center text-lg mb-10 text-[#3FD7FA] font-semibold">
                        {weekContent[weekId].subtitle}
                    </p>
                )}

                <div className="font-inter">
                    <div className="mb-10 mx-auto w-76 @sm/main:w-96 @lg/main:w-[32rem] @2xl/main:w-[40rem] rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                        <h3 className="font-semibold text-center text-lg mb-1">❄️ Challenge Details</h3>
                        
                        {weekId === "week-four" ? (
                            <div>
                                <div className="text-left mb-3">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">🧠 Core Idea</h3>
                                    <p className="text-sm mb-2">All previous weeks were about:</p>
                                    <ul className="list-none pl-3 gap-1 text-sm flex flex-col mb-2">
                                        <li>❄️ Building</li>
                                        <li>❄️ Refining</li>
                                        <li>❄️ Unlearning</li>
                                    </ul>
                                    <p className="text-sm mb-2 font-semibold">Now comes ownership.</p>
                                    <p className="text-sm mb-2">
                                        In <span className="text-[#3FD7FA] font-semibold">The Winter Manifesto</span>, participants must create one definitive personal declaration that captures:
                                    </p>
                                    <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                        <li>What they discovered during Winter Arc</li>
                                        <li>What they are leaving behind</li>
                                        <li>What they are committing to next</li>
                                    </ul>
                                    <p className="text-sm mb-1">This is not motivation.</p>
                                    <p className="text-sm italic text-[#3FD7FA] font-semibold">This is decision + direction + declaration.</p>
                                </div>

                                <div className="text-left mb-3">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">❄️ What Is a "Winter Manifesto"?</h3>
                                    <p className="text-sm mb-2">A clear, structured, personal document or artifact that defines:</p>
                                    <ul className="list-none pl-3 gap-1 text-sm flex flex-col mb-2">
                                        <li>❄️ What ends with this winter</li>
                                        <li>🔥 What begins after it</li>
                                        <li>🧭 How they will move forward</li>
                                    </ul>
                                    <p className="text-sm mb-2 font-semibold">It can be:</p>
                                    <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                        <li>A written manifesto</li>
                                        <li>A visual declaration</li>
                                        <li>A video statement</li>
                                        <li>A roadmap + ruleset</li>
                                        <li>A personal contract</li>
                                    </ul>
                                </div>

                                <div className="text-left mb-3">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">🧊 What Can Participants Include? (Flexible but Deep)</h3>
                                    <div className="space-y-3">
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🧠 Reflection</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Key lessons from Winter Arc</li>
                                                <li>One truth they accepted</li>
                                                <li>One illusion they dropped</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🧭 Direction</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Focus area for next 3–6 months</li>
                                                <li>Skills / habits they&apos;ll prioritise</li>
                                                <li>Distractions they&apos;ll eliminate</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🔥 Commitment</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Non-negotiables</li>
                                                <li>Rules they&apos;ll live by</li>
                                                <li>Standards they set for themselves</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-3 text-[#3FD7FA] font-medium">👉 This is about identity, not output.</p>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">📜 Rules (Final Week – Strict)</h3>
                                    <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                        <li>Submission must be original & personal</li>
                                        <li>No generic quotes or copied templates</li>
                                        <li>Must reflect Winter Arc journey</li>
                                        <li>Can include media, but clarity &gt; aesthetics</li>
                                        <li>AI tools allowed only for structure, not substance</li>
                                    </ul>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">📤 Submission Guidelines (Mandatory)</h3>
                                    <p className="text-sm mb-2 font-semibold">Each submission must include:</p>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm font-semibold">1️⃣ THE MANIFESTO</p>
                                            <p className="text-xs pl-2">Document / visual / video / hybrid</p>
                                            <p className="text-xs pl-2">Clear sections & structure</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">2️⃣ EXPLANATION (Text)</p>
                                            <p className="text-xs pl-2">Why you wrote it this way</p>
                                            <p className="text-xs pl-2">What changed in you during Winter Arc</p>
                                            <p className="text-xs pl-2">How this manifesto will guide you next</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">3️⃣ PROOF / MEDIA</p>
                                            <p className="text-xs pl-2">Screenshots / document / video</p>
                                            <p className="text-xs pl-2">Uploaded to Google Drive</p>
                                            <p className="text-xs pl-2">Drive link pasted in submission</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">💡 Suggestions (Optional)</h3>
                                    <p className="text-sm mb-2">Participants may use:</p>
                                    <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                        <li>ChatGPT / Perplexity to structure thoughts</li>
                                        <li>Notion / Docs / Canva</li>
                                        <li>Pen & paper → digital</li>
                                    </ul>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">🏆 Judging Criteria (Manual – Finale Level)</h3>
                                    <p className="text-sm mb-2">Judged by MATRIX authorities on:</p>
                                    <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                        <li>Depth & honesty</li>
                                        <li>Clarity of direction</li>
                                        <li>Internal consistency</li>
                                        <li>Emotional & intellectual weight</li>
                                        <li>Overall impact</li>
                                    </ul>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">🎁 Grand Finale Rewards</h3>
                                    <ul className="list-none pl-3 gap-1 text-sm flex flex-col">
                                        <li>🥇 Best Winter Manifesto → 🎧 Earbuds</li>
                                        <li>🥈 Runner-ups → 📚 Premium domain-relevant books / resources</li>
                                        <li>⭐ Special Mentions for authenticity & depth</li>
                                    </ul>
                                </div>

                                <div className="text-center mt-4 p-3 bg-[#0a1929] rounded-lg border border-[#3FD7FA]">
                                    <p className="text-sm italic text-[#3FD7FA] font-semibold">📌 Reminder:</p>
                                    <p className="text-sm">This is not for applause.</p>
                                    <p className="text-sm font-semibold">This is for alignment.</p>
                                </div>
                            </div>
                        ) : weekId === "week-three" ? (
                            <div>
                                <div className="text-left mb-3">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">🧠 Core Idea</h3>
                                    <p className="text-sm mb-2">Winter is not only about building - it is about letting go.</p>
                                    <p className="text-sm mb-2">
                                        In <span className="text-[#3FD7FA] font-semibold">Icebreak: The Unlearn Task</span>, participants must identify one belief, habit, method, or system they&apos;ve followed that is inefficient, outdated, or harmful, and replace it with a clearer approach.
                                    </p>
                                    <p className="text-sm italic">This challenge rewards awareness, honesty, and correction.</p>
                                </div>

                                <div className="text-left mb-3">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">❄️ What Can You Unlearn?</h3>
                                    <p className="text-sm mb-2 font-semibold">Anything that touches your life, work, or growth.</p>
                                    <div className="grid grid-cols-1 gap-4 @sm/main:grid-cols-2">
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">📚 Learning & Academics</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Ineffective study methods</li>
                                                <li>Passive note-taking</li>
                                                <li>Last-minute revision habits</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">💼 Work & Skills</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Wrong coding practice</li>
                                                <li>Poor project workflow</li>
                                                <li>Shallow learning routines</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🎨 Content & Creativity</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Posting without strategy</li>
                                                <li>Chasing trends blindly</li>
                                                <li>Inconsistent branding habits</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🧠 Habits & Lifestyle</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Fitness myths</li>
                                                <li>Sleep misconceptions</li>
                                                <li>Productivity hacks that don&apos;t work</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3 @sm/main:col-span-2">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🧰 Tools & Systems</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Misusing Notion / Google Drive</li>
                                                <li>Overcomplicated trackers</li>
                                                <li>Broken time-management systems</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-3 text-[#3FD7FA] font-medium">👉 If something is holding you back, it qualifies.</p>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">🧊 Winter Arc Philosophy</h3>
                                    <p className="text-sm mb-2">Ice preserves what is strong. Ice cracks what is weak.</p>
                                    <p className="text-sm">This task is about breaking false foundations so real progress can begin.</p>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">📜 Rules (Mandatory)</h3>
                                    <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                        <li>Choose only ONE belief, habit, method, or system</li>
                                        <li>It must be something you personally followed</li>
                                        <li>Clearly explain why it was wrong or inefficient</li>
                                        <li>Replacement must be practical and realistic</li>
                                        <li>AI tools are allowed, but thinking must be original</li>
                                        <li>Generic motivational content will not be evaluated</li>
                                    </ul>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">📤 Submission Guidelines</h3>
                                    <p className="text-sm mb-2 font-semibold">Each submission must include all four sections:</p>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm font-semibold">1️⃣ OLD BELIEF / HABIT</p>
                                            <p className="text-xs pl-2">What were you following earlier? How long had you been doing it?</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">2️⃣ WHY IT WAS WRONG</p>
                                            <p className="text-xs pl-2">What problems did it create? What results were missing or negative?</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">3️⃣ NEW APPROACH</p>
                                            <p className="text-xs pl-2">What did you change? What is your new method, belief, or system?</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">4️⃣ PROOF OR EXPLANATION</p>
                                            <p className="text-xs pl-2">Screenshots, notes, visuals, or a structured explanation that shows the new approach is better</p>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-3">📎 Upload all screenshots / documents / visuals to Google Drive</p>
                                    <p className="text-sm">Paste the Drive link in your submission description.</p>
                                    <p className="text-sm mt-2 font-semibold">❗ Submissions without clear comparison will not be evaluated.</p>
                                </div>
                            </div>
                        ) : weekId === "week-two" ? (
                            <div>
                                <div className="text-left mb-3">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">🧠 Core Idea</h3>
                                    <p className="text-sm mb-2">Winter is the season of refinement.</p>
                                    <p className="text-sm mb-2">
                                        In <span className="text-[#3FD7FA] font-semibold">Glow-Up Anything</span>, participants must take something ordinary, overlooked, or imperfect and transform it into a better, clearer, more effective version.
                                    </p>
                                    <p className="text-sm italic">It can be small or big, digital or physical, personal or professional — the glow-up is what matters.</p>
                                </div>

                                <div className="text-left mb-3">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">❄️ What Can You Glow-Up?</h3>
                                    <p className="text-sm mb-2 font-semibold">Absolutely anything. No restrictions.</p>
                                    <div className="grid grid-cols-1 gap-4 @sm/main:grid-cols-2">
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">📄 Work & Career</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Resume or CV</li>
                                                <li>LinkedIn / Instagram bio</li>
                                                <li>Portfolio section</li>
                                                <li>GitHub README</li>
                                                <li>Old project documentation</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">📚 Academics & Learning</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Class notes</li>
                                                <li>Study timetable</li>
                                                <li>Revision strategy</li>
                                                <li>Flashcards</li>
                                                <li>Subject roadmap</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🧠 Habits & Systems</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Morning routine</li>
                                                <li>Study habit</li>
                                                <li>Fitness plan</li>
                                                <li>Screen-time control system</li>
                                                <li>Daily workflow</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🎨 Creative & Content</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Old poster or design</li>
                                                <li>Reel or content idea</li>
                                                <li>Caption style</li>
                                                <li>Writing sample</li>
                                                <li>Visual identity</li>
                                            </ul>
                                        </div>
                                        <div className="pl-3 @sm/main:col-span-2">
                                            <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🧰 Tools & Objects</h2>
                                            <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                                <li>Notion workspace</li>
                                                <li>Google Drive organization</li>
                                                <li>Phone home screen</li>
                                                <li>Desk setup</li>
                                                <li>Personal tracker</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-3 text-[#3FD7FA] font-medium">👉 If you can show before and after, it qualifies.</p>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">🧊 The Winter Arc Philosophy</h3>
                                    <p className="text-sm mb-2">This challenge is about:</p>
                                    <ul className="list-none pl-3 gap-1 text-sm flex flex-col">
                                        <li>❄️ Removing clutter</li>
                                        <li>❄️ Adding clarity</li>
                                        <li>❄️ Sharpening intent</li>
                                        <li>❄️ Turning chaos into calm</li>
                                    </ul>
                                    <p className="text-sm mt-2 italic text-[#3FD7FA]">
                                        A glow-up is not about adding more — it&apos;s about making it better.
                                    </p>
                                </div>

                                <div className="text-left mb-2">
                                    <h3 className="font-medium flex items-center mb-2 mt-1">📜 Rules (Must Read)</h3>
                                    <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                        <li>Only ONE item can be submitted per participant</li>
                                        <li>The item must be originally yours</li>
                                        <li>Glow-up must show clear improvement</li>
                                        <li>AI tools are allowed, but explain how you used them</li>
                                        <li>Copy-paste or template-only submissions will be disqualified</li>
                                        <li className="font-semibold">Honesty & effort matter more than perfection</li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
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
                        )}

                        <div className="flex items-center w-full justify-around mt-4">
                            <Link href={`/weekly-submit/${weekId}`}><Button className="font-bold">✨ SUBMIT NOW</Button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}
