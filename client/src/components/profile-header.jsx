import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin, UserRound , AtSign, Share2 } from "lucide-react";

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
                        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <AtSign className="size-4" />
                                {user.username}
                            </div>
                        </div>
                    </div>
                </div>
    );
}
