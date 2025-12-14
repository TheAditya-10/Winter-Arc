import { NextResponse } from "next/server"
import { fetcher } from "@/utils/apiService"
import { createClient } from "@/utils/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { isValidateState } from "@/utils/share-on-linkedin"

const supabase = await createClient()

export async function GET(request) {
    try {
        const { userId } = await auth()

        const params = request.nextUrl.searchParams
        const code = params.get('code')
        const state = params.get('state')

        // Todo: verify state
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
            redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
        }
        const { expires_in, access_token, id_token } = await fetcher('https://www.linkedin.com/oauth/v2/accessToken', 'post', body, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
        const { error } = await supabase
            .from("linked_creds")
            .insert({ expires_in, access_token, user_id: userId })

        // TODO: store linkedin_id in database
        const { sub: linkedin_id } = JSON.parse(Buffer.from(id_token.split(".")[1], "base64").toString())
        console.log("sub: ", linkedin_id) 

        if (error) {
            throw new Error(error.message)
        }

        return NextResponse.redirect('http://localhost:3000/dashboard/me?type=success&message=Your+LinkedIn+account+is+successfully+connected%21%21')
    } catch (error) {
        console.error(error)
        return NextResponse.redirect('http://localhost:3000/dashboard/me?type=error&message=Failed+to+connect+with+your+linkedIn+account%21%21')
    }
}