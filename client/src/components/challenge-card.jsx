import {
    Card,
    CardHeader,
    CardContent,
} from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { UserRoundPen } from "lucide-react"
import Link from "next/link"
import ChallengeImage from "./challenge-img"


const ChallengeCard = ({ challenge, isRegistred }) => {

    return (
        <Card className="@container/card shadow-none py-0 gap-3">
            <CardContent className="py-4 px-4">
                <Badge variant="secondary">Technology</Badge>
                {isRegistred && <Badge variant="secondary" className={"ml-2"}>Active</Badge>}

                <h3 className="mt-4 text-xl font-medium tracking-tight h-16 overflow-ellipsis line-clamp-2">
                    {challenge?.title}
                </h3>
                <div className="mt-6 flex items-center justify-between">
                    {/* <ChallengeImage id={challenge?.id}/> */}
                    <Link href={`/dashboard/challenges/${challenge?.id}`}>
                        <Button>
                            View Details
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export { ChallengeCard }