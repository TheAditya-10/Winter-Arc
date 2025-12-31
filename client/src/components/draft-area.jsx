"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { draftFormSchema as formSchema } from "@/app/schema"
import { shareOnLinkedIn } from "@/app/actions"


function DraftArea({ taskInfo, challengeInfo, submissionInfo }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            textContent: `📅 Day ${taskInfo.dayNumber} / 30 – ${challengeInfo.title}\n\nToday’s focus was on **${taskInfo.title}**.\n\n✅ What I completed today:\n- {{TASK_POINT_1}}\n- {{TASK_POINT_2}}\n- {{TASK_POINT_3}}\n\n📚 Key learnings:\n- {{LEARNING_1}}\n- {{LEARNING_2}}\n\nThis challenge is helping me build consistency, improve problem-solving, and stay accountable through daily progress.\n\nLooking forward to continuing the journey tomorrow 🚀\n\n#30DayChallenge #DailyProgress #LearningInPublic #Consistency #ProfessionalGrowth #BuildInPublic #CareerGrowth`,
            imageUrl: submissionInfo?.imageUrl,
        }
    })

    
    const handleSubmit = async (formData) => {
        setIsLoading(true)
        let loadToast = toast.loading("Creating draft of linedin post...")
        try {
            const { error: formError, message: formMessage } = await shareOnLinkedIn(formData)
            if (formError) {
                Object.entries(formError).map(([field, message]) => {
                    form.setError(field, { message })
                })
                return toast.error(formMessage)
            }

            toast.success(formMessage)
            window.location.assign("https://www.linkedin.com");
        } catch (error) {
            toast.error(error.message)
            // toast.error("Some think went wrong. Please try again later!!")
        } finally {
            toast.dismiss(loadToast)
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full h-full min-h-fit flex items-center justify-center">
            <Card className="w-full max-w-md max-sm:max-w-sm max-sm:py-4">
                <CardHeader className={"max-sm:px-4"}>
                    <CardTitle className={"line-clamp-1"}>{taskInfo?.title}</CardTitle>
                    <CardDescription className="line-clamp-1">Share On LinkedIn</CardDescription>
                    <CardAction>
                        <Button variant="link" onClick={() => router.back()}>Back</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className={"max-sm:px-4"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="sm:space-y-6 space-y-4">
                            <FormField
                                control={form.control}
                                name="textContent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="example: Learn basic of Javascript."
                                                rows={8}
                                                className="min-h-36 resize-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full h-48 rounded-md border overflow-hidden flex items-center justify-center">
                                <img src={submissionInfo.imageUrl} className="object-cover" alt="" />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>PUBLISH POST</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export { DraftArea }