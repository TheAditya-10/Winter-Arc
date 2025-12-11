import { NextResponse } from "next/server"
import { fetcher } from "@/utils/apiService"
import { headers } from "next/headers"

export async function GET(request) {
    try {
        const params = request.nextUrl.searchParams
        const code = params.get('code')
        const state = params.get('state')

        // Todo: verify state

        if (code) {
            const body = {
                // Content- Type: application/x-www-form-urlencoded
                grant_type: "authorization_code",
                code: code,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
                redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
            }
            console.log(body)
            const data = await fetcher('https://www.linkedin.com/oauth/v2/accessToken', 'post', body, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            console.log(data)
        }

        return NextResponse.redirect('http://localhost:3000/')
    } catch (error) {
        console.error(error)
        return NextResponse.redirect('http://localhost:3000/')
    }
}