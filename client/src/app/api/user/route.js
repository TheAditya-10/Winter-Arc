import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { shareOnLinkedIn } from "@/app/actions"

export async function GET(request) {
    const { userId } = await auth()

    // return NextResponse.json({...sessionClaims })
    await shareOnLinkedIn("22166641-57ec-42bd-9f92-80bc58a2627b")
    return NextResponse.json({ userId })

}

export async function POST(request) {
    const user = await request.json()
    console.log(user)
    return NextResponse.json({ message: "User registered successfully!!" })
}

