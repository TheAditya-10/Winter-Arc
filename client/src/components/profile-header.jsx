"use client"

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, AtSign, CopyIcon } from "lucide-react";
import {toast} from "sonner"

export default function ProfileHeader({ user }) {

    return (
        <div className="flex gap-6 items-center mx-auto font-inter">
            <div className="relative m-auto">
                <Avatar className="size-20 ">
                    <AvatarImage src={user.avatarUrl} alt="Profile" />
                    <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                </Avatar>
            </div>
            <div className="flex-1 space-y-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <h1 className="text-xl font-semibold">{user.name}</h1>
                </div>
                <div className="text-muted-foreground flex flex-wrap flex-col gap-1 text-sm">
                    <div className="flex items-center gap-1">
                        <AtSign className="size-4" />
                        {user.username}
                    </div>
                    <Button  
                        onClick={async () => {
                            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register?referral=${user.username}`)
                            toast.success("Refferal link is copied!!")
                        }}
                        variant={"link"} className="flex items-center gap-1 text-white" style={{height: "fit-content", padding: 0}}>
                            <CopyIcon className="size-4" />
                            referral link
                        </Button>
                </div>
            </div>
        </div>
    );
}
