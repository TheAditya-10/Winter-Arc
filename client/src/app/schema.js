import { z } from "zod"

const registerFormSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    username: z.string()
        .min(5, "Name must be at least 5 characters")
        .max(20, "Name can be maximum of 20 characters")
        .refine((un) => /^[a-zA-Z0-9]+$/.test(un), { error: 'Only alphabet and digits are allowed.' }),
    referral: z.string().nullable(),
    year: z.number("required").int().lt(5).gt(0),
    branch: z.enum(["AI", "CSE", "CE", "ECE", "EE", "ME", "MT", "IP", "IT"], "required"),
})

const submitFormSchema = z.object({
    description: z.string().min(20, "minimum 20 characters are required.").max(500, "maximum 500 characters are allowed."),
    imageFile: z.union([
        z.object({ type: z.enum(['image/jpeg', 'image/png'], "Only .png and .jpeg files are accepted."), size: z.number().int().gt(0).lt(1024 * 1024 * 8, "file size should be less than 6MB") }),
        z.file().max(1024 * 1024 * 8, "file size should be less than 6MB").mime(['image/jpeg', 'image/png'], "Only .png and .jpeg files are accepted.")
    ]),
})

const draftFormSchema = z.object({
    textContent: z.string().min(20, "minimum 20 characters are required."),
    imageUrl: z.url()
})

const weeklyTaskSubmitFormSchema = z.object({
    description: z.string().min(50, "minimum 50 characters are required."),
    driveUrl: z.url("Invalid URL")
})

export { registerFormSchema, submitFormSchema, draftFormSchema, weeklyTaskSubmitFormSchema }
