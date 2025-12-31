"use client"
import { Button } from "./ui/button"
import { initiateConnectWithLinkedin } from "@/app/actions"
import { useState } from "react"


const ConnectWithLinkedin = () => {
    // const [hidde, setHidde] = useState(false)

    return (<>
        {!hidde && <Button
            onClick={async () => {
                await initiateConnectWithLinkedin()
                // setHidde(true)
            }}
        >
            Connect with LinkedIn
        </Button>}
    </>
    )
}

export { ConnectWithLinkedin }