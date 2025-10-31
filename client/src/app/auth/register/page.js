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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createUser } from "@/app/actions"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { registerFormSchema as formSchema } from "@/app/schema"


export default function Register() {

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            year: "",
            branch: "",
        }
    })

    const handleSubmit = async (formData) => {
        setIsLoading(true)
        const loadToast = toast.loading("Submiting form...")
        try {
            const { error, message } = await createUser(formData)
            if (error) {
                Object.entries(error).map(([field, message]) => {
                    form.setError(field, { message })
                })
                toast.error(message)
            } else {
                toast.success(message)
                router.push('/')
            }
        } catch (error) {
            toast.error("Some think went wrong. Please try again later!!")
        } finally {
            toast.dismiss(loadToast)
            setIsLoading(false)
        }
    }



    return (
        <Card className="w-full max-w-md max-sm:max-w-sm">
            <CardHeader>
                <CardTitle>Winter Arc</CardTitle>
                <CardDescription>Registration Open</CardDescription>
                <CardAction>
                    <Button variant="link">Back</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fullname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe47" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full justify-between max-sm:flex-col max-sm:gap-6">
                            <FormField
                                control={form.control}
                                name="branch"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="max-sm:w-full w-48">
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="AI">AI</SelectItem>
                                                    <SelectItem value="CSE">CSE</SelectItem>
                                                    <SelectItem value="CE">CE</SelectItem>
                                                    <SelectItem value="ECE">ECE</SelectItem>
                                                    <SelectItem value="EE">EE</SelectItem>
                                                    <SelectItem value="ME">ME</SelectItem>
                                                    <SelectItem value="MT">MT</SelectItem>
                                                    <SelectItem value="IP">IP</SelectItem>
                                                    <SelectItem value="IT">IT</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={String(field.value)}
                                                onValueChange={(val) => field.onChange(Number(val))}
                                            >
                                                <SelectTrigger className="max-sm:w-full w-48">
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1st</SelectItem>
                                                    <SelectItem value="2">2nd</SelectItem>
                                                    <SelectItem value="3">3rd</SelectItem>
                                                    <SelectItem value="4">4th</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>Send</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}