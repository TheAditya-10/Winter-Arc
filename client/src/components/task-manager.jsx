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
import { FileInputField } from "@/components/upload-file"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { submitFormSchema as formSchema } from "@/app/schema"
import { createSubmission, evaluateSubmission } from "@/app/actions"
import Image from "next/image"
import { FeedbackOverlay } from "./feedback-overlay"


function TaskManager({ task, isTech }) {
    const [isLoading, setIsLoading] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [rejected, setRejected] = useState("")
    const [submissionInfo, setSubmissionInfo] = useState({})
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            imageFile: "",
        }
    })

    const uploadFile = async (file, uploadConfig) => {
        let retries = 0
        while (retries < 4) {
            retries++
            try {
                const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`

                const formData = new FormData()
                formData.append("file", file)
                Object.keys(uploadConfig).map(key => formData.append(key, uploadConfig[key]))

                const response = await fetch(url, {
                    method: "POST",
                    body: formData
                });
                return await response.json();
            } catch (error) {
                console.error("Error while uploading image: ", error)

                if (retries == 3) throw new Error("Failed to load image.")

                const loader = toast.loading("This may take time")
                await new Promise((res) => setTimeout(res, 1000*retries*(2**retries) + Math.round(Math.random()*1000)))
                toast.dismiss(loader)
            }
        }
    }


    const handleSubmit = async (formData) => {
        setIsLoading(true)
        setShowDialog(false)
        setRejected("")
        let loadToast = toast.loading("Processing your submission...")
        try {
            const { error: formError, message: formMessage, uploadConfig, submissionId } = await createSubmission(formData, task)
            if (formError) {
                Object.entries(formError).map(([field, message]) => {
                    form.setError(field, { message })
                })
                return toast.error(formMessage)
            }


            toast.dismiss(loadToast)
            loadToast = toast.loading("Loading your image...")

            const { secure_url: url, error: uploadError } = await uploadFile(form.getValues("imageFile"), uploadConfig)
            if (uploadError) throw new Error(uploadError)

            toast.dismiss(loadToast)
            loadToast = toast.loading("AI is evaluating your submission...")

            const { error, messages: feedbackMessage, rejected: rejectedInfo, score, feedback } = await evaluateSubmission({ url, description: formData.description }, task, submissionId)
            if (error) throw new Error(error.message)

            if (!rejectedInfo) {
                setSubmissionInfo({
                    score,
                    feedback,
                    id: submissionId,
                    messages: feedbackMessage
                })
            } else {
                setRejected(rejectedInfo)
                setSubmissionInfo({
                    feedback
                })
            }
            setShowDialog(true)
        } catch (error) {
            toast.error(error.message)
            // toast.error("Some think went wrong. Please try again later!!")
        } finally {
            toast.dismiss(loadToast)
            setIsLoading(false)
        }
    }

    return (
        <div className="font-inter w-full h-full min-h-fit flex items-center justify-center">
            <Card className="w-full max-w-md max-sm:max-w-sm max-sm:py-4">
                <CardHeader className={"max-sm:px-4"}>
                    <CardTitle className={"line-clamp-1"}>{task?.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{task?.description}</CardDescription>
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
                                                rows={5}
                                                className="min-h-24 resize-none"
                                            />
                                        </FormControl>
                                        <FormDescription className={"flex w-full justify-between"}><span>Share your todays work in detail.</span><span className={field.value.length > 800 && "font-semibold text-destructive"}>{field.value.length}/800</span></FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="imageFile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upload Image</FormLabel>
                                        <FormControl>
                                            <FileInputField
                                                inputFile={field.value}
                                                setInputFile={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>Send</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <FeedbackOverlay
                isOpen={showDialog}
                setIsOpen={setShowDialog}
                messages={submissionInfo.messages}
                aiFeedback={submissionInfo.feedback}
                rejected={rejected}
                redirectUrl={isTech == "true" ? `/share/${submissionInfo.id}` : "/dashboard/me"} />
        </div>
    )
}

export { TaskManager }