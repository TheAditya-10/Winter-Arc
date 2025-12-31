import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"


export async function POST(request) {
    try{
        const { tag } = await request.json()
        revalidateTag(tag)
        return NextResponse.json({ message: "Cache revalidated successfully!!" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "failed to revalidate cache!!"})
    }
}