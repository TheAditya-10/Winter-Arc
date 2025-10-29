import {
    Card,
    CardHeader,
    CardContent
} from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { UserRoundPen } from "lucide-react"


const ChallengeCard = ({ challenge }) => {
    return (
        <Card className="shadow-none py-0 gap-3">
            <CardHeader className="p-2 pb-0">
                <div className="aspect-video bg-muted rounded-lg w-full" />
            </CardHeader>
            <CardContent className="pt-0 pb-5 px-5">
                <Badge variant="secondary">Technology</Badge>

                <h3 className="mt-4 text-[1.3rem] font-semibold tracking-tight">
                    { challenge?.title }
                </h3>
                <div className="mt-6 flex items-center justify-between">
                    <Button variant="outline" size="sm">
                        <UserRoundPen size={64} />
                        <span>24</span>
                    </Button>

                    <Button>
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export { ChallengeCard }