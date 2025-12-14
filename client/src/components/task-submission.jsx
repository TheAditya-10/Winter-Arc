"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CircleStar, TrophyIcon, X } from "lucide-react"

export function TaskSubmissionDialog({ showDialog, setShowDialog, score, onContinue, feedback, rejected, onShareLinkedin }) {
    return (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="bg-primary/20 rounded-full w-fit p-4">
                            {rejected ? <X size={40} /> : <TrophyIcon size={40} />}
                        </div>
                        {
                            rejected
                                ? (<>
                                    <AlertDialogTitle>Submission Rejected!</AlertDialogTitle>
                                    <AlertDialogDescription>Your submission is rejected due to poor quality of content.<br></br>Your conent may be irrelavant to task or not very descriptive.</AlertDialogDescription>
                                </>)
                                : (<>
                                    <AlertDialogTitle>Task Completed!</AlertDialogTitle>
                                    <AlertDialogDescription>Congratulations! You've successfully completed this task.</AlertDialogDescription>
                                    <Button variant={"outline"} className={"px-8"}><CircleStar style={{ height: "20px", width: "20px" }} /> {score} XP Earned!</Button>
                                </>)
                        }
                    </div>
                    <div>
                        <h3 className="my-2 leading-none font-semibold text-left">AI Feedback</h3>
                        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-6 shadow-sm max-h-32 overflow-y-auto font-mono text-sm scrollbar-thin">
                            {feedback}
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className={"sm:justify-center justify-center"}>
                    {rejected
                        ? <AlertDialogAction>Try Again</AlertDialogAction>
                        : (<>
                            <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
                            <AlertDialogAction onClick={onShareLinkedin}>Share on LinkedIn</AlertDialogAction>
                        </>)}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


export { TaskSubmissionDialog }