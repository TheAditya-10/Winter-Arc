"use server"
import { Button } from "./ui/button"
import Link from "next/link"


const ConnectWithLinkedin = () => {

    return (
        <Link
            href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&state=foobar&scope=profile%20email%20w_member_social%20openid`}>
            <Button>Connect with LinkedIn</Button>
        </Link>
    )
}

export { ConnectWithLinkedin }