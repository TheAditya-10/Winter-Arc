import { getUserStatsById } from "@/lib/dal/user"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function GET(request) {
    const { userId } = await auth()

    const {data, error} = await getUserStatsById(userId, true)
    console.log(data || error)

    // return NextResponse.json({...sessionClaims })
    return NextResponse.json({ userId })

}

export async function POST(request) {
    const user = await request.json()
    console.log(user)
    return NextResponse.json({ message: "User registered successfully!!" })
}

