import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin, UserRound , AtSign, Share2 } from "lucide-react";

export default function ProfileHeader({ user }) {
    return (
        <Card className={"w-fit mx-auto"}>
            <CardContent>
                <div className="flex flex-col items-start gap-6 sm:flex-row md:items-center">
                    <div className="relative m-auto">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.avatar_url} alt="Profile" />
                            <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                        </div>
                        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <AtSign className="size-4" />
                                {user.username}
                            </div>
                            <Button variant="secondary"><Share2/> Share</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
