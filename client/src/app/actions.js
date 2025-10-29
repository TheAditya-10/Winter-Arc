'use server'
import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/utils/supabase/server"
import { clerkClient } from "@clerk/nextjs/server"
import {writeFile} from "fs/promises"

const supabase = await createClient()
const clerk = await clerkClient()

export async function createUser(formData) {
    try {
        const { sessionClaims, userId } = await auth()

        if (userId && sessionClaims) {
            const { avatar_url, id } = sessionClaims
            const user = { ...formData, avatar_url, id, points: 0 }
            const { error } = await supabase.from('users').insert([user])
            if (error) {
                throw new Error(error.message)
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
        return { error: "Registration failed!!" }
    }
}

export async function submitTask(formData) {
    try {
        const { imageFile, discription } = formData;
        console.log(imageFile)
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const url = `./public/uploads/${Date.now()+'.'+imageFile.name.split('.').pop()}`
        await writeFile(url, buffer);

        // TODO: Store task data in database

        return { message: "Submit successfully!!" }
    } catch (error) {
        console.error("Error:\n", error)
        return { error: "Please try again later!!" }
    }
}