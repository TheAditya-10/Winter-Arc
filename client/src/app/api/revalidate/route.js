import { NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"


export async function POST(request) {
    try{
        const { tag, path, type } = await request.json()
        if(tag) {
            revalidateTag(tag)
            return NextResponse.json({ message: `${tag} revalidated successfully!!` })
        }
        if(path && type) {
            revalidatePath(path, type)
            return NextResponse.json({ message: `${path} ${type} revalidated successfully!!` })
        }
        return NextResponse.json({message: `missing argument`})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "failed to revalidate cache!!"})
    }
}