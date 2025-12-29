import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
    // Or a custom loading skeleton component
    return (<div className="w-dvw h-dvh flex items-center justify-center">
        <Spinner className={"size-12 text-primary"}/>
    </div>)
}
