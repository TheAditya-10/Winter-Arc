'use server'
import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/utils/supabase/server"
import { clerkClient } from "@clerk/nextjs/server"
import { writeFile } from "fs/promises"
import { registerFormSchema, submitFormSchema } from "./schema"
import { z } from "zod"

const supabase = await createClient()
const clerk = await clerkClient()

export async function createUser(formData) {

    try {
        const { success, error } = registerFormSchema.safeParse(formData)

        if (!success) {
            const formFieldErrors = z.flattenError(error).fieldErrors

            return {
                error: {
                    name: formFieldErrors.name[0],
                    username: formFieldErrors.username[0],
                    year: formFieldErrors.year[0],
                    branch: formFieldErrors.year[0],
                },
                message: "Invalid input!!"
            }
        }

        const { sessionClaims, userId } = await auth()

        if (userId && sessionClaims) {
            const { avatar_url, id } = sessionClaims
            const user = { ...formData, avatar_url, id, points: 0 }
            const { error } = await supabase.from('users').insert([user])
            if (error) {
                return {
                    error: {
                        username: "Username must be unique!!",
                    },
                    message: "Username already exist!!"
                }
            }
            const updateUsernameRes = await clerk.users.updateUser(userId, {
                username: formData?.username,
            })
            const updateMetadataRes = await clerk.users.updateUserMetadata(userId, {
                publicMetadata: { status: "registered" },
            })
            return { message: "User is registered successfully!!" }
        }
    } catch (error) {
        console.error("Error:\n", error)
        return { error: true, message: "Registration failed!!" }
    }
}

export async function submitTask(formData) {
    try {

        const { success, error } = submitFormSchema.safeParse(formData)

        if (!success) {
            const formFieldErrors = z.flattenError(error).fieldErrors

            return {
                error: {
                    discription: formFieldErrors.discription[0],
                    imageFile: formFieldErrors.imageFile[0],
                },
                message: "Invalid input!!"
            }
        }

        const { imageFile, discription } = formData;
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const url = `./public/uploads/${Date.now() + '.' + imageFile.name.split('.').pop()}`
        await writeFile(url, buffer);

        // TODO: Store task data in database

        return { message: "Submit successfully!!" }
    } catch (error) {
        console.error("Error:\n", error)
        return { message: "Please try again later!!", error: true }
    }
}

export async function registerForChallenge(challenge_id) {
    try {
        const { userId: user_id } = await auth()
        const { error } = await supabase.from("challenge_registrations").insert({ challenge_id, user_id })
        if(error){
            throw new Error(error.message)
        }
        return {
            message: "Your challenge is started now!!"
        }
    } catch (error) {
        console.error(error)
        return { 
            error: true,
            message: "Please try again later!!"
        }
    }
}