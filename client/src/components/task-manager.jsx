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
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileInputField } from "@/components/upload-file"
import { useState, useRef } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { submitFormSchema as formSchema } from "@/app/schema"
import { TaskSubmissionDialog } from "./task-submission"
import { Flame, ArrowLeft, Loader2, Sparkles } from "lucide-react"
import { createSubmission, evaluateSubmission } from "@/app/actions"
import { cn } from "@/lib/utils"

function TaskManager({ task }) {
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
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`

        const formData = new FormData()
        formData.append("file", file)
        Object.keys(uploadConfig).map(key => formData.append(key, uploadConfig[key]))

        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        return await response.json();
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

            const { error, message, rejected: rejectedInfo, score, streak, feedback } = await evaluateSubmission({ url, description: formData.description }, task, submissionId)
            if (error) throw new Error(error.message)

            if (!rejectedInfo) {
                if (streak) {
                    toast(`${streak.count} ` + streak.message, {
                        icon: <Flame className="size-4 text-orange-500" />,
                        position: "top-right"
                    })
                }
                setSubmissionInfo({
                    score,
                    feedback,
                    id: submissionId,
                })
                toast.success(message)
                
                setTimeout(() => {
                    router.push("/mission-complete");
                }, 1000);

            } else {
                setRejected(rejectedInfo)
                setSubmissionInfo({
                    feedback
                })
                toast.error(message)
                setShowDialog(true)
            }
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            toast.dismiss(loadToast)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-950 relative overflow-hidden flex items-center justify-center p-4">
            
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-30"></div>
            </div>

            <TaskSubmissionDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                score={submissionInfo.score}
                feedback={submissionInfo.feedback}
                rejected={rejected}
                onContinue={() => router.push(`/dashboard/challenges/${task.challengeId}`)}
                onShareLinkedin={() => router.push(`/share/${submissionInfo.id}`)} 
            />

            <Card className="w-full max-w-2xl bg-slate-900/50 border-slate-800 backdrop-blur-md shadow-2xl relative z-10">
                <CardHeader className="border-b border-slate-800 pb-5 pt-6">
                    <div className="flex items-center justify-between mb-1">
                         <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => router.back()}
                            className="text-slate-400 hover:text-white hover:bg-slate-800 -ml-2 h-8"
                         >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                         </Button>
                         <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono">
                            <Sparkles className="w-3 h-3" />
                            AI Powered
                         </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-white font-bold tracking-tight">
                        {task?.title || "Daily Challenge"}
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-sm mt-1 line-clamp-2">
                        {task?.description || "Upload your proof of work to complete this mission."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-8">
                    <Form {...form}>
                        {/* INCREASED SPACING: space-y-8 gives more breathing room */}
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                            
                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white text-base font-semibold">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Briefly explain what you learned or built..."
                                                rows={3}
                                                className="bg-slate-950/50 border-slate-700 text-slate-200 resize-none focus:border-cyan-500 focus:ring-cyan-500/20 min-h-[90px] rounded-xl text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* File Upload Field */}
                            <FormField
                                control={form.control}
                                name="imageFile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white text-base font-semibold">Proof of Work</FormLabel>
                                        <FormControl>
                                            {/* ADDED FIXED HEIGHT (h-56) to ensure it sits nicely without being too tall or too cramped */}
                                            <div className="h-56 border-2 border-dashed border-slate-700 rounded-xl p-2 hover:bg-slate-900/50 transition-colors bg-slate-950/30 flex flex-col justify-center">
                                                <FileInputField
                                                    inputFile={field.value}
                                                    setInputFile={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button 
                                type="submit" 
                                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base py-6 mt-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.99]" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Mission"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export { TaskManager }