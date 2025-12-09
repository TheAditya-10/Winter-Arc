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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { PartyPopper, CircleStar, TrophyIcon } from "lucide-react"

export function TaskSubmissionDialog({ showDialog, setShowDialog, score, onContinue }) {
    return (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="bg-primary/20 rounded-full w-fit p-4">
                            <TrophyIcon size={40} />
                        </div>
                        <AlertDialogTitle>Task Completed!</AlertDialogTitle>
                        <AlertDialogDescription>Congratulations! You've successfully completed this task.</AlertDialogDescription>
                        <Button variant={"outline"} className={"px-8"}><CircleStar style={{ height: "20px", width: "20px" }} /> {score} XP Earned!</Button>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className={"sm:justify-center justify-center"}>
                    <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


export { TaskSubmissionDialog }