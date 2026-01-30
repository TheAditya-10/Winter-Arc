"use server"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { getFinalSubmissionByUserId, getAllFinalSubmissions } from "@/lib/dal/submission"
import FinalSubmissionPage from "@/components/final-submission-page"


export default async function Page(params) {

    const { userId } = await auth()

    const { data: userSubmission, error: userSubmissionError } = await getFinalSubmissionByUserId(userId)
    const { data: allSubmissions, error } = await getAllFinalSubmissions();

    if (error || userSubmissionError) {
        console.error(error)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }

    return (
        <>
            <section className="pb-12 pt-10 font-poppins">
                <h1 className="text-foreground px-2 mb-6 text-center text-2xl font-bold tracking-tighter @sm/main:text-3xl">
                    🔥 THE ARC PROJECT
                </h1>
                <p className="text-center text-lg mb-0 text-[#3FD7FA] font-semibold">
                    One Project. One Story. One Winter.
                </p>
                <FinalSubmissionPage userSubmission={userSubmission} allSubmissions={allSubmissions} />

                {/* IMPORTANT NOTICE */}
                <div className="mx-auto w-76 @sm/main:w-96 @lg/main:w-[32rem] @2xl/main:w-[40rem] mb-6 p-4 bg-red-950/30 border-2 border-red-500/50 rounded-lg">
                    <p className="text-center text-sm font-bold text-red-400 mb-2">⚠️ MANDATORY FOR PRIZE ELIGIBILITY ⚠️</p>
                    <p className="text-center text-xs text-red-300">
                        This is a compulsory submission for all contestants. Without completing The Arc Project, you will be removed from the leaderboard and will not be eligible for any prizes.
                    </p>
                </div>

                <div className="font-inter">
                    <div className="mb-10 mx-auto w-76 @sm/main:w-96 @lg/main:w-[32rem] @2xl/main:w-[40rem] rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                        <h3 className="font-semibold text-center text-lg mb-1">❄️ Grand Finale Details</h3>
                        
                        <div>
                            <div className="text-left mb-3">
                                <p className="text-sm mb-2">
                                    <span className="text-[#3FD7FA] font-semibold">The Arc Project</span> is the final and most important submission of Winter Arc.
                                </p>
                                <p className="text-sm mb-2">Participants must create one major, meaningful output that represents:</p>
                                <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                    <li>What they built</li>
                                    <li>What they refined</li>
                                    <li>What they unlearned</li>
                                    <li>What they are becoming</li>
                                </ul>
                                <p className="text-sm mb-1">This is not a random project.</p>
                                <p className="text-sm italic text-[#3FD7FA] font-semibold">This is proof of growth.</p>
                            </div>

                            <div className="text-left mb-3">
                                <h3 className="font-medium flex items-center mb-2 mt-1">❄️ What Is the Arc Project?</h3>
                                <p className="text-sm mb-2">
                                    A single, focused project or artifact that reflects your domain, skills, and direction after completing Winter Arc.
                                </p>
                                <p className="text-sm mb-2 font-semibold">It can be:</p>
                                <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                    <li>Technical or non-technical</li>
                                    <li>Individual or system-based</li>
                                    <li>Practical or creative</li>
                                </ul>
                                <p className="text-sm italic text-[#3FD7FA]">What matters is depth, intent, and learning.</p>
                            </div>

                            <div className="text-left mb-3">
                                <h3 className="font-medium flex items-center mb-2 mt-1">🌍 Domains & Example Arc Projects</h3>
                                <div className="space-y-3">
                                    <div className="pl-3">
                                        <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">💻 Tech / Coding</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                            <li>Full-stack mini application</li>
                                            <li>ML / AI model with explanation</li>
                                            <li>Automation tool or script suite</li>
                                            <li>Backend service / API</li>
                                            <li>Major DSA or system-design project</li>
                                        </ul>
                                        <p className="text-xs italic pl-5">Examples: &quot;Student productivity tracker&quot;, &quot;Disease prediction system&quot;, &quot;Portfolio website with backend&quot;</p>
                                    </div>

                                    <div className="pl-3">
                                        <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🎨 Design / Creative</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                            <li>Complete brand identity</li>
                                            <li>UI/UX case study</li>
                                            <li>Design system</li>
                                            <li>Content series + strategy</li>
                                            <li>Visual storytelling project</li>
                                        </ul>
                                        <p className="text-xs italic pl-5">Examples: &quot;Rebrand of a personal page&quot;, &quot;UI case study for a real problem&quot;</p>
                                    </div>

                                    <div className="pl-3">
                                        <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">📚 Academics / Learning</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                            <li>Subject mastery guide</li>
                                            <li>Research summary or paper draft</li>
                                            <li>Learning roadmap + resources</li>
                                            <li>Teaching module or notes system</li>
                                        </ul>
                                        <p className="text-xs italic pl-5">Examples: &quot;Operating Systems revision framework&quot;, &quot;AI roadmap with applied projects&quot;</p>
                                    </div>

                                    <div className="pl-3">
                                        <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🧠 Productivity / Systems</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                            <li>Personal operating system</li>
                                            <li>Habit-building framework</li>
                                            <li>Time management system</li>
                                            <li>Knowledge management setup</li>
                                        </ul>
                                        <p className="text-xs italic pl-5">Examples: &quot;My 90-day execution system&quot;, &quot;Distraction-free study workflow&quot;</p>
                                    </div>

                                    <div className="pl-3">
                                        <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">🎥 Content / Media / Marketing</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                            <li>YouTube or Instagram content strategy</li>
                                            <li>Content batch with analytics</li>
                                            <li>Personal brand storytelling project</li>
                                        </ul>
                                        <p className="text-xs italic pl-5">Examples: &quot;30-day content plan with metrics&quot;, &quot;Niche-based creator blueprint&quot;</p>
                                    </div>

                                    <div className="pl-3">
                                        <h2 className="font-medium flex items-center mb-2 mt-1 text-[#3FD7FA]">💪 Fitness / Lifestyle</h2>
                                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col mb-2">
                                            <li>Transformation plan with logic</li>
                                            <li>Workout + diet system</li>
                                            <li>Health tracking framework</li>
                                        </ul>
                                        <p className="text-xs italic pl-5">Examples: &quot;Beginner fitness blueprint&quot;, &quot;Weight-gain or fat-loss system&quot;</p>
                                    </div>
                                </div>
                                <p className="text-sm mt-3 text-[#3FD7FA] font-medium">👉 Any domain is allowed. If it represents your Winter Arc journey, it qualifies.</p>
                            </div>

                            <div className="text-left mb-3">
                                <h3 className="font-medium flex items-center mb-2 mt-1">🧊 Winter Arc Philosophy</h3>
                                <p className="text-sm mb-2 italic">Winter strips away noise. What you build here remains.</p>
                                <p className="text-sm text-[#3FD7FA] font-semibold">The Arc Project is about direction, not decoration.</p>
                            </div>

                            <div className="text-left mb-2">
                                <h3 className="font-medium flex items-center mb-2 mt-1">📜 Rules (Finale-Level)</h3>
                                <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                    <li>Only ONE Arc Project per participant</li>
                                    <li>Project must be original</li>
                                    <li>Must show effort beyond one hour</li>
                                    <li>Must reflect learning from Winter Arc</li>
                                    <li>AI tools allowed, but explain how you used them</li>
                                    <li>Generic or copied projects will be disqualified</li>
                                </ul>
                            </div>

                            <div className="text-left mb-2">
                                <h3 className="font-medium flex items-center mb-2 mt-1">📤 Submission Guidelines (Mandatory)</h3>
                                <p className="text-sm mb-2 font-semibold">Each submission must include ALL sections below:</p>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm font-semibold">1️⃣ THE ARC PROJECT (Main Output)</p>
                                        <p className="text-xs pl-2">Code / document / design / system / plan</p>
                                        <p className="text-xs pl-2">Hosted, documented, or presented clearly</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">2️⃣ PROJECT EXPLANATION (Text)</p>
                                        <p className="text-xs pl-2">• What is your Arc Project?</p>
                                        <p className="text-xs pl-2">• Why did you choose it?</p>
                                        <p className="text-xs pl-2">• What problem does it solve?</p>
                                        <p className="text-xs pl-2">• What did you learn while building it?</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">3️⃣ WINTER ARC LEARNING SUMMARY</p>
                                        <p className="text-xs pl-2">Key lessons from:</p>
                                        <p className="text-xs pl-4">• Build in 60</p>
                                        <p className="text-xs pl-4">• Glow-Up Anything</p>
                                        <p className="text-xs pl-4">• Icebreak</p>
                                        <p className="text-xs pl-2">How these shaped your final project</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">4️⃣ PROOF OF WORK</p>
                                        <p className="text-xs pl-2">Screenshots, demo videos, documents</p>
                                        <p className="text-xs pl-2">Uploaded to Google Drive</p>
                                        <p className="text-xs pl-2">Drive link pasted in submission</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-left mb-2">
                                <h3 className="font-medium flex items-center mb-2 mt-1">🎥 OPTIONAL (Strongly Encouraged)</h3>
                                <p className="text-sm mb-2">60-second reflection video where you share:</p>
                                <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                    <li>What you learned in these 30 days</li>
                                    <li>What changed in your mindset</li>
                                    <li>What you&apos;re taking forward</li>
                                </ul>
                                <p className="text-xs mt-2 italic text-[#3FD7FA]">📌 This is optional, but adds weight to your submission.</p>
                            </div>

                            <div className="text-left mb-2">
                                <h3 className="font-medium flex items-center mb-2 mt-1">💡 Suggestions (Optional)</h3>
                                <p className="text-sm mb-2">Participants may use:</p>
                                <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                    <li>ChatGPT / Perplexity for research & structuring</li>
                                    <li>GitHub / Notion / Canva / Docs</li>
                                    <li>Blogs, books, or mentors</li>
                                </ul>
                                <p className="text-xs mt-2 italic text-[#3FD7FA]">📌 Tools assist. Ownership matters.</p>
                            </div>

                            <div className="text-left mb-2">
                                <h3 className="font-medium flex items-center mb-2 mt-1">🏆 Judging Criteria (Grand Finale)</h3>
                                <p className="text-sm mb-2">Extensive AI Judgement based on:</p>
                                <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                                    <li>Depth & effort</li>
                                    <li>Clarity of problem & solution</li>
                                    <li>Learning & growth reflection</li>
                                    <li>Practical usefulness</li>
                                    <li>Overall impact & intent</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center w-full justify-around mt-4">
                            <Link href="/weekly-submit/final">
                                <Button className="font-bold">🔥 SUBMIT ARC PROJECT</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}