"use client"

import { Button } from "./ui/button"
import { registerForChallenge } from "@/app/actions"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"


const ChallengeDetail = ({ tasks, challenge, isRegistred, taskCompleted }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [taskDetail, setTaskDetail] = useState({})
  const [showChallengeInfo, setShowChallengeInfo] = useState(false)
  const currentDayNumber = taskCompleted.size

  const onStartNowClick = async () => {
    setIsLoading(true)
    const loadToast = toast.loading("loading ...")
    try {
      const { message, error } = await registerForChallenge(challenge.id)
      if (error) {
        toast.error(message)
      } else {
        toast.success(message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Some thing went wrong. Please try again later!!")
    } finally {
      toast.dismiss(loadToast)
      setIsLoading(false)
    }
  }

  const weekBox = {
    title: ["week 1", "week 2", "week 3", "week 4", "Final Days"],
    text: [
      "The cold doesn't care about your excuses. Lock in.",
      "Most people are hibernating. This is where you pull ahead.",
      "Motivation gets you started; the Arc keeps you going.",
      "It's easier to keep the fire going than to restart it from the ash.",
      "Form basic sentences, greet people"
    ]
  }


  return (
    <>
      <section className="pb-32 pt-10">
        <h1 className="text-foreground px-2 mb-10 text-center text-2xl font-bold tracking-tighter @sm/main:text-3xl">
          {challenge.title}
        </h1>

        <div className="">
          {
            (showChallengeInfo || !isRegistred) && (
              <div className="mb-10 mx-auto w-76 @sm/main:w-96 @lg/main:w-[32rem] @2xl/main:w-[40rem] rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                <h3 className="font-semibold text-center text-lg mb-1">Challenge Details</h3>
                <div className="flex gap-2">
                  <Image src={"/challenge-detail/clock.svg"} width={20} height={20} alt="estimated time" />
                  <span className="font-medium">Level:</span> Biginner
                </div>
                <div className="flex gap-2">
                  <Image src={"/challenge-detail/clock.svg"} width={20} height={20} alt="estimated time" />
                  <span className="font-medium">Duration:</span> 30 Days
                </div>
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-2 mt-1">
                    <Image src={"/challenge-detail/question-mark.svg"} width={20} height={20} alt="what to do" />
                    <span>What You Gain</span>
                  </h4>
                  <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                    {challenge.description.split("\n\n").map((text, i) => <li key={i}>{text}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-2 mt-1">
                    <Image src={"/challenge-detail/question-mark.svg"} width={20} height={20} alt="what to do" />
                    <span>Requirements</span>
                  </h4>
                  <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
                    <li>No programming experence needed.</li>
                    <li>A laptop with access to the internet</li>
                  </ul>
                </div>
                <div className="flex items-center w-full justify-around mt-4">
                  {!isRegistred
                    ? <Button onClick={onStartNowClick} className={"w-fit"}>Start Now</Button>
                    : <Button variant={"secondary"} onClick={() => setShowChallengeInfo(false)} className={"w-fit"}>Progress</Button>
                  }
                  <Link href={`/roadmap/${challenge.id}.pdf`}><Button variant={"secondary"}>Roadmap</Button></Link>
                </div>
              </div>
            )
          }
          {
            (!showChallengeInfo && isRegistred) && (
              <div className="mb-10 mx-auto w-76 @sm/main:w-96 @lg/main:w-[32rem] @2xl/main:w-[40rem] rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
                <h3 className="font-semibold text-center text-lg mb-1">Challenge Progress</h3>
                <div className="mb-4 @sm/main:px-4">
                  <div className="flex justify-between items-center"><span className="font-medium">Total Submissions</span><span className="text-sm">{taskCompleted.size - 1} / 30</span></div>
                  <div className="w-full h-2 bg-[#4B4B4B] rounded-full"><div className="bg-[#FFC800] rounded-full h-full" style={{ width: `${(taskCompleted.size - 1) * 100 / 30}%` }} /></div>
                </div>
                <div className="mb-4 @sm/main:px-4">
                  <div className="flex justify-between items-center"><span className="font-medium">Total XP Earned</span><span className="text-sm">{taskCompleted.get("xpEarned")} XP</span></div>
                  <div className="w-full h-2 bg-[#4B4B4B] rounded-full"><div className="bg-[#FFC800] rounded-full h-full" style={{ width: `${taskCompleted.get("xpEarned") * 100 / 1500}%` }} /></div>
                </div>
                <div className="flex items-center w-full justify-around mt-4">
                  <Button variant={"secondary"} onClick={() => setShowChallengeInfo(true)} className={"w-fit"}>Details</Button>
                  <Link href={`/roadmap/${challenge.id}.pdf`}><Button variant={"secondary"}>Roadmap</Button></Link>
                </div>
              </div>
            )
          }

          <div className="relative mx-auto max-w-4xl px-2">
            {tasks.map((task, i) => {
              const taskScore = taskCompleted.get(task.id)
              const isCurrentDay = currentDayNumber == task.dayNumber;
              return (
                <div key={task.id}>
                  {i % 7 == 0 && (<div className="my-16">
                    <div className="rounded-lg px-2 bg-[#86C8DE] text-white w-[24rem] justify-between mx-auto flex gap-2 items-center">
                      <div className="py-2">
                        <h3 className="font-bold">{weekBox.title[i / 7]}</h3>
                        <p className="text-sm">{weekBox.text[i / 7]}</p>
                      </div>
                      <Link href={"/rules-rewards"} className="rounded-lg bg-[#75B0C4] border-2 min-w-fit border-[#000000]/20 flex gap-2 p-2 text-sm font-medium">
                        <Image src={"/challenge-detail/notebook.svg"} height={16} width={16} alt="rulebook" />
                        RULEBOOK
                      </Link>

                    </div>
                  </div>)}
                  <div key={task.id} className=" flex items-center justify-center mb-4">
                    <div
                      className="size-16 text-center relative flex items-center justify-center cursor-pointer"
                      onClick={() => setTaskDetail({ ...task, score: taskScore, isCurrentTask: currentDayNumber == task.dayNumber })}
                      style={{ left: Math.floor(Math.sin(task.dayNumber - 1) * 100) }}>
                      <Image src={`/challenge-detail/${isCurrentDay ? "white" : (!!taskScore ? "blue" : "gray")}-snow-ball.svg`} alt="task" fill className="absolute top-0 bottom-0" />
                      <p className={`z-10 relative -top-1 text-xl font-bold ${isCurrentDay ? "text-[#2DB4E0]" : "text-white"}`}>{task.dayNumber}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {taskDetail.id && <TaskDetailCard task={taskDetail} isRegistred={isRegistred} close={() => setTaskDetail({})} />}
    </>
  );
};

export { ChallengeDetail };

const TaskDetailCard = ({ task, close, isRegistred }) => {
  return (<div className="w-dvw h-dvh fixed bg-muted/80 backdrop-blur-md flex items-center justify-center z-100 top-0 left-0" onClick={() => close()}>
    <div className="">
      <h2 className="font-semibold bg-[#0A0F1F] shadow-[0_0_20px_#5689C1] border-2 border-[#5689C1] rounded-md px-4 w-fit text-lg mx-auto">Day-{task.dayNumber}</h2>
      <div className="w-76 sm:w-96 rounded-lg p-4 bg-[#021024] flex flex-col gap-2 shadow-[0_0_20px_#5689C1] border-2 border-[#616E95] overflow-hidden bg-[url('/challenge-detail/card-background.svg')]">
        <h3 className="font-semibold text-center text-lg mb-1">{task.title}</h3>
        <div className="flex gap-2">
          <Image src={"/challenge-detail/clock.svg"} width={20} height={20} alt="estimated time" />
          Estimated time: 45-60 mins
        </div>
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-2 mt-1">
            <Image src={"/challenge-detail/question-mark.svg"} width={20} height={20} alt="what to do" />
            <span>What to do</span>
          </h4>
          <ul className="list-disc pl-5 gap-1 text-sm flex flex-col">
            {task.description.split("\n\n").map((text, i) => <li key={i}>{text}</li>)}
          </ul>
        </div>
        {(isRegistred) && <>{!!task.score
          ? <Button variant={"outline"}>{task.score} XP Earned</Button>
          : <>{task.isCurrentTask && <Link href={`/${task.id}/submit`} className={"self-center"}><Button>Submit</Button></Link>}</>
        }</>}
      </div>
    </div>
  </div>)
}
