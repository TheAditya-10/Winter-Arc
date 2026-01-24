"use server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { getFinalSubmissionByUserId } from "@/lib/dal/submission"

export default async function Page(params) {

    const { userId } = await auth()

    const {data: submission, error} = await getFinalSubmissionByUserId(userId)

    if (error) {
        console.error(error)
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Some thing went wrong!!</h1></div>)
    }
    
    if (submission) return (<section className="pb-32 pt-10 font-poppins flex w-full min-h-full items-center justify-center">
        <Button variant={"outline"}>{!submission.score? "Your submission is under review!!": `You have earned ${submission.score} XP`}</Button>
    </section>
    )

    return <section className="pb-32 pt-10 font-poppins flex w-full min-h-full items-center justify-center">
        <Link href={`/weekly-submit/final`}>
            <Button className="font-bold">SUBMIT NOW</Button>
        </Link>
    </section>
}