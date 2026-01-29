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
            </section>
        </>
    )
}