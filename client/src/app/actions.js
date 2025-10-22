'use server'
import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/utils/supabase/server"
import { clerkClient } from "@clerk/nextjs/server"

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

            const res = await clerk.users.updateUserMetadata(userId, {
                publicMetadata: { status: "registered" },
            })
            console.log(res.publicMetadata)
            return "User is registered successfully!!"
        }
    } catch (error) {
        console.error("Error:", error.message)
        return "Failed !!"
    }
}