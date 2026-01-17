import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { submissionLimit } from "@/utils/rate-limiter"


export async function GET(request) {
    const { userId } = await auth()
    const res = await submissionLimit.limit("test")
    return NextResponse.json(res)

}

export async function POST(request) {
    const user = await request.json()
    console.log(user)
    return NextResponse.json({ message: "User registered successfully!!" })
}

