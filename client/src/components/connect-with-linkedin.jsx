"use client"
import { Button } from "./ui/button"
import { initiateConnectWithLinkedin } from "@/app/actions"


const ConnectWithLinkedin = () => {

    return (<>
        <Button
            onClick={async () => {
                await initiateConnectWithLinkedin()
            }}
        >
            Connect with LinkedIn
        </Button>
    </>
    )
}

export { ConnectWithLinkedin }