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
import { submitTask } from "../actions"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { submitFormSchema as formSchema } from "../schema"


export default function Dashboard() {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            discription: "",
            imageFile: "",
        }
    })

    const handleSubmit = async (formData) => {
        setIsLoading(true)
        const loadToast = toast.loading("Submiting form...")
        const { error, message } = await submitTask(formData)
        if (error) {
            Object.entries(error).map(([field, message]) => {
                form.setError(field, { message })
            })
            toast.error(message)
        } else {
            toast.success(message)
            router.push('/dashboard/challenges')
        }
        toast.dismiss(loadToast)
        setIsLoading(false)
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Card className="w-full max-w-md max-sm:max-w-sm">
                <CardHeader>
                    <CardTitle>Task Title</CardTitle>
                    <CardDescription>Discription of task .....</CardDescription>
                    <CardAction>
                        <Button variant="link">Back</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="discription"
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
                                        <FormDescription>Share your todays work in detail.</FormDescription>
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
        </div>
    )
}