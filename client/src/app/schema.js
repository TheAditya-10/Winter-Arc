import { z } from "zod"

const registerFormSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    username: z.string().min(10, "Name must be at least 10 characters"),
    year: z.number("required").int().lt(5).gt(0),
    branch: z.enum(["AI", "CSE", "CE", "ECE", "EE", "ME", "MT", "IP", "IT"], "required"),
})

const submitFormSchema = z.object({
    description: z.string().min(20, "minimum 20 characters are required."),
    imageFile: z.file().max(1024 * 1024).mime(['image/jpeg', 'image/png'], "Only .png and .jpeg files are accepted."),
})

export { registerFormSchema, submitFormSchema }
