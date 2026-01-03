"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
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
import { weeklyTaskSubmitFormSchema as formSchema } from "@/app/schema"
import { submitWeeklyTask } from "@/app/actions"


function WeeklyFormSubmit({ weekTitle, weekNumber, weekId }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            driveUrl: "",
        }
    })


    const handleSubmit = async (formData) => {
        setIsLoading(true)
        let loadToast = toast.loading("Uploading your weekly submission...")
        try {
            // TODO: insert form data into database
            formData.weekId = weekId
            const { error, message } = await submitWeeklyTask(formData)
            
            if(error){
                return toast.error(message)
            }

            toast.success(message)
            router.push("/dashboard/weekly-tasks")
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
                    <CardTitle className={"line-clamp-1"}>{weekTitle}</CardTitle>
                    <CardDescription className="line-clamp-1">Weekly Challenge {weekNumber}</CardDescription>
                    <CardAction>
                        <Button variant="link" onClick={() => router.back()}>Back</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className={"max-sm:px-4"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="sm:space-y-6 space-y-4">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="driveUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Drive Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="example: Learn basic of Javascript."
                                                type={"url"}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>SUBMIT</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export { WeeklyFormSubmit }