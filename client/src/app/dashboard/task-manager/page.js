"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Input } from "@/components/ui/input"
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
import { FileInputField } from "@/components/uploadFile"


const formSchema = z.object({
    discription: z.string().min(20, "minimum 20 characters are required."),
    imageFile: z.file().max(1024 * 1024).mime(['image/jpeg', 'image/png'], "Only .png and .jpeg files are accepted."),
})

export default function Dashboard() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            discription: "",
            imageFile: "",
        }
    })

    const handleSubmit = async (formData) => {
        
        
        console.log(await formData)
    }

    return (
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
                        <Button type="submit" className="w-full">Send</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}