import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(request) {
    const { sessionClaims } = await auth()

    return NextResponse.json({...sessionClaims })
}

export async function POST(request) {
    const user = await request.json()
    console.log(user)
    return NextResponse.json({message: "User registered successfully!!"})
}

