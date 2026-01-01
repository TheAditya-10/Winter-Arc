import { NextResponse } from "next/server"
import { fetcher } from "@/utils/apiService"
import { auth } from "@clerk/nextjs/server"
import { isValidateState } from "@/utils/share-on-linkedin"
import { setUserCred } from "@/lib/dal/creds"
import { clerkClient } from "@clerk/nextjs/server"

const clerk = await clerkClient()

export async function GET(request) {
    try {
        const { userId } = await auth()

        const params = request.nextUrl.searchParams
        const code = params.get('code')
        const state = params.get('state')

        // TODO: verify state
        const isVerified = await isValidateState(state, userId);
        if (!isVerified) {
            return new Response("Unauthorize request!!", { status: 401, })
        }

        if (!code) {
            // TODO: handle error
            return
        }

        const body = {
            grant_type: "authorization_code",
            code: code,
            client_id: process.env.LINKEDIN_CLIENT_ID,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/linkedin/callback",
        }
        const { expires_in, access_token, id_token } = await fetcher('https://www.linkedin.com/oauth/v2/accessToken', 'post', body, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
        const { sub: linkedin_id } = JSON.parse(Buffer.from(id_token.split(".")[1], "base64").toString())

        const { error } = await setUserCred(access_token, linkedin_id, expires_in)

        const updateMetadataRes = await clerk.users.updateUserMetadata(userId, {
            publicMetadata: { linkedin: "connected" },
        })

        if (error) {
            throw new Error(error.message)
        }
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/me?linkedin=connected`)
    } catch (error) {
        console.error(error.message || error)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/me?linkedin=failed`)
        }
}