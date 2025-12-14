"use server"
import { Button } from "./ui/button"
import Link from "next/link"
import { createVerifcationState } from "@/utils/share-on-linkedin"
import { auth } from "@clerk/nextjs/server"


const ConnectWithLinkedin = async () => {

    const { userId } = await auth()
    const state = await createVerifcationState(userId)

    return (
        <Link
            href={`https://www.linkedin.com/oauth/v2/authorization?enable_extended_login=true&response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&state=${state}&scope=profile%20email%20w_member_social%20openid`}>
            <Button>Connect with LinkedIn</Button>
        </Link>
    )
}

export { ConnectWithLinkedin }