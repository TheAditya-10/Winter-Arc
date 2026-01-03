"use server"
import { TZDate } from "@date-fns/tz"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Timer } from "@/components/timer"
import { getUserWeeklySubmission } from "@/lib/dal/user"

export default async function Page() {

    const weekId = ["week-one", "week-two", "week-three", "week-four"]

    const weeklyTaskStartTime = ["04", "11", "18", "25"].map((dayNumber) => new TZDate(new Date(Date.UTC(2026, 0, dayNumber, 0, 0, 0)), "Asia/Calcutta").getTime())

    const weeklyTaskState = weeklyTaskStartTime.map((startTime) => {
        const now = new TZDate(new Date(), "Asia/Calcutta").getTime();
        if (now - startTime < 0) return "upcoming";
        else if (now - startTime < 24 * 60 * 60 * 1000) return "active";
        else return "completed";
    })

    const currentWeekInfo = weeklyTaskState.reduce((acc, curr, i) => {
        if (curr != "completed" && !acc) return { state: curr, index: i }
        return acc
    }, null)

    let submissionId = null

    if (currentWeekInfo.state == "active") {
        const { data, error } = await getUserWeeklySubmission(weekId[currentWeekInfo.index])
        if (error) {
            console.error(error.message)
        } else {
            submissionId = data?.id
        }
    }

    const progressState = (Date.now() - weeklyTaskStartTime[0]) / (weeklyTaskStartTime[3] - weeklyTaskStartTime[0])

    return (
        <section className="flex flex-col items-center gap-4 px-2">
            <div className="rounded-lg p-4 max-xm:px-2 max-w-[30rem] w-full my-4 text-center text-xl font-bold bg-[#021024] shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                {currentWeekInfo.state == "active" ? "WEEKLY CHALLENGE IS LIVE !!" : "JOIN US ON SUNDAY!!"}
            </div>

            <div className="flex w-full max-w-[36rem] gap-4 items-center justify-between relative">
                <div className="w-[calc(100%-24px)] mx-3 overflow-hidden rounded-full h-2 absolute bg-[#616E95] top-4 sm:top-6">
                    <div className="h-full bg-[#3FD7FA] rounded-full" style={{ width: `${(progressState > 0 ? progressState : 0) * 100}%` }} />
                </div>
                {weeklyTaskState.map((state, i) => (
                    <div key={i} className={`${state == "active" ? "text-[#2DB4E0]" : "text-white"} flex items-center justify-center mb-4 font-tacone`}>
                        <div
                            className="size-12 sm:size-16 text-center relative flex items-center justify-center cursor-pointer">
                            <Image src={`/challenge-detail/${state == "active" ? "white" : (state == "completed" ? "blue" : "gray")}-snow-ball.svg`} alt="weekly-task" fill className="absolute top-0 bottom-0" />
                            <span className="absolute z-1000 font-semibold text-xs sm:top-2 top-1 font-poppins">week</span>
                            <p className={`z-10 relative text-2xl font-bold `}>{i + 1}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Challenge Intro */}
            {currentWeekInfo.state == "active" && <div className="font-inter rounded-lg my-2 max-w-[30rem] w-full text-center text-xl font-bold bg-[#021024] shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                <div className="flex items-center max-sm:flex-col max-sm:px-2">
                    <div className="bg-[url('/dashboard/snow-flake.svg')] bg-no-repeat bg-contain p-12 w-fit h-fit">
                        <div className="relative size-16 text-3xl rounded-full bg-[#062B5D] outline-4 outline-[#678CAC] -outline-offset-6 flex items-center justify-center text-[#3FD7FA] font-bold ">
                            <span className="absolute top-2 text-sm">week</span><span className="relative top-1">{currentWeekInfo.index + 1}</span>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-center text-[#3FD7FA] my-4">Winter Arc: Build in 60</h2>
                        <div className="text-left">
                            <h3 className="font-medium text-sm mb-1">Challenge Idea</h3>
                            <ul className="text-sm list-disc font-normal pl-4">
                                <li>
                                    Create anything meaningful in just 60 minutes that improves learning, productivity, creativity, or personal efficiency - based on your own experience or interest.
                                </li>
                                <li>
                                    This challenge focuses on execution under constraints, not perfection.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {submissionId
                    // ? (<Link href={`/dashboard/weekly-tasks/${weekId[currentWeekInfo.index]}/${submissionId}`}>
                    //     <Button className="my-4 font-medium" variant={"outline"}>Your Submission is under review</Button>
                    // </Link>)
                    ? <Button className="my-4 font-medium" variant={"outline"}>Your Submission is under review</Button>
                    : (<Link href={`/dashboard/weekly-tasks/${weekId[currentWeekInfo.index]}`}>
                        <button className="my-4 bg-[url('/weekly-task/btn-bg.svg')] text-xl sm:text-2xl font-black text-[#111C35] font-inter bg-contain bg-no-repeat p-4">START NOW!</button>
                    </Link>)
                }
            </div>}

            {/* Timer */}
            <div className="rounded-lg p-4 my-2 max-w-[30rem] w-full bg-[#021024] shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                <h3 className="font-bold text-xl">{currentWeekInfo.state == "active" ? "END" : "START"}S IN:</h3>
                <div className="font-semibold flex items-center justify-center" style={{ margin: currentWeekInfo.state == "active" ? "0" : "2rem 0" }}>
                    <Timer timestamp={weeklyTaskStartTime[currentWeekInfo?.index] + (currentWeekInfo?.state == "active" ? 24 * 60 * 60 * 1000 : 0)} />
                </div>
                {currentWeekInfo?.state == "active" && <p className="m-auto w-fit">Submissions close automatically</p>}
            </div>

            {/* Judging Criteria */}
            <div className="">
                <h2 className="font-semibold bg-[#0A0F1F] shadow-[0_0_20px_#5689C1] border-2 border-[#5689C1] rounded-md px-4 w-fit text-lg mx-auto">Judging Criteria</h2>
                <div className="w-76 sm:w-96 rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                    <div>
                        <h4 className="font-medium flex items-start gap-2 mb-2 mt-1">
                            <Image src={"/challenge-detail/question-mark.svg"} width={20} height={20} alt="what to do" />
                            <span>Judging will be done manually by MATRIX authorities based on:</span>
                        </h4>
                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                            <li>Relevance & usefulness.</li>
                            <li>Clarity of idea.</li>
                            <li>Ececution quality.</li>
                            <li>Creativity / originality.</li>
                            <li>Effort & explanation quality.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="">
                <h2 className="font-semibold bg-[#0A0F1F] shadow-[0_0_20px_#5689C1] border-2 border-[#5689C1] rounded-md px-4 w-fit text-lg mx-auto">Suggestions</h2>
                <div className="w-76 sm:w-96 rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                    <div>
                        <h4 className="font-medium flex items-start gap-2 mb-2 mt-1">
                            <Image src={"/challenge-detail/question-mark.svg"} width={20} height={20} alt="what to do" />
                            <span>Participants are allowed and encouraged to use:</span>
                        </h4>
                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                            <li>ChatGPT.</li>
                            <li>Perplexity.</li>
                            <li>Google / YouTube.</li>
                            <li>Canva templates.</li>
                            <li>Notion Ai or similar tools.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Submission Guidline */}
            <div className="">
                <h2 className="font-semibold bg-[#0A0F1F] shadow-[0_0_20px_#5689C1] border-2 border-[#5689C1] rounded-md px-4 w-fit text-lg mx-auto">Submission Requirements</h2>
                <div className="w-76 sm:w-96 rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                    <div>
                        <h4 className="font-medium flex items-start gap-2 mb-2 mt-1">
                            <Image src={"/challenge-detail/question-mark.svg"} width={20} height={20} alt="what to do" />
                            <span>Participants must submit all of the following:</span>
                        </h4>
                        <p className="text-sm font-semibold">Detailed Description</p>
                        <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                            <li>What did you build?</li>
                            <li>What problem does it solve?</li>
                            <li>Who is it useful for?</li>
                            <li>Tools/platforms used</li>
                            <li>Exact time taken (try to complete in an Hour)</li>
                            <li>Proof of Work (Media) - Screenshots / photos / screen recording / short demo video</li>
                        </ul>
                        <p className="text-sm my-2">Upload all files to Google Drive - and Make them Public</p>
                        <p className="text-sm mb-2 font-semibold">All the Requierments are mandatory.</p>
                    </div>
                </div>
            </div>

            {/* Prizes */}
            <div className="">
                <h2 className="font-semibold bg-[#0A0F1F] shadow-[0_0_20px_#5689C1] border-2 border-[#5689C1] rounded-md px-4 w-fit text-lg mx-auto">Prizes</h2>
                <div className="w-76 sm:w-96 rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                    <div>
                        <ul className=" flex flex-col font-semibold gap-2">
                            <li className="flex">🥇 Top Submission:
                                <span className="w-fit text-[#FFC800] pl-4">Earbuds</span>
                            </li>
                            <li className="flex">
                                <span className="w-fit">🥈 Runner-ups: </span>
                                <span className="w-fit text-[#FFC800] pl-4">Relevant Book / <br /> Learning Resources</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

