import { z } from "zod"

const registerFormSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    username: z.string()
    .min(5, "Name must be at least 5 characters")
    .max(20, "Name can be maximum of 20 characters")
    .refine((un) => /^[a-zA-Z0-9]+$/.test(un),{ error: 'Only alphabet and digits are allowed.'}),
    year: z.number("required").int().lt(5).gt(0),
    branch: z.enum(["AI", "CSE", "CE", "ECE", "EE", "ME", "MT", "IP", "IT"], "required"),
})

const submitFormSchema = z.object({
    description: z.string().min(20, "minimum 20 characters are required.").max(500, "maximum 500 characters are allowed."),
    imageFile: z.file().max(512 * 1024, "file size should be less than 500 kb").mime(['image/jpeg', 'image/png'], "Only .png and .jpeg files are accepted."),
})

export { registerFormSchema, submitFormSchema }
