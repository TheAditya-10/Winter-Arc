import { useState, useEffect } from 'react'
import { UserRound, AtSign } from "lucide-react";
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getFinalSubmission } from '@/app/actions';


const finalLeadearboardColumns = [
    {
        accessorKey: "user",
        header: () => <div className="w-full text-left">User</div>,
        cell: ({ row }) => {
            return (<div variant="link" className="font-medium gap-2 h-12 w-fit px-0 text-left flex items-center flex-1">
                <div className="relative m-auto">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={row.original.user.avatarUrl} alt="Profile" />
                        <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 space-y-0">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <h1 className="text-md text-ellipsis break-all max-sm:max-w-[110px] line-clamp-1">{row.original.user.name}</h1>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-0.5 text-sm text-muted">
                            <AtSign className="size-3" />
                            <p className="text-ellipsis break-all line-clamp-1 max-sm:max-w-24">{row.original.user.username}</p>
                        </div>
                    </div>
                </div>
            </div>)
        },
        enableHiding: false,
    },
    {
        accessorKey: "view",
        header: () => <div className="w-full text-center">Submissions</div>,
        cell: ({ row }) => (<Button variant={"link"} className={"text-primary-foreground"} onClick={(e) => { e.stopPropagation(); window.setViewSubmission({ user: row.original.user, id: row.id }) }}>view</Button>)
    }
]


const FinalSubmissionLeaderboard = ({
    data: initialData,
    columns,
}) => {

    const [data, setData] = useState(() => initialData)
    const [viewSubmission, setViewSubmission] = useState(() => null)
    window.setViewSubmission = setViewSubmission;

    const router = useRouter()

    const table = useReactTable({
        data,
        columns,
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        getCoreRowModel: getCoreRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div className="rounded-lg h-fit relative overflow-y-auto">
            <h2 className="text-center text-xl font-medium my-2">All Submissions</h2>
            <div className="bg-muted/20 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                    <div key={headerGroup.id} className="grid @sm/main:grid-cols-[1fr_120px] grid-cols-[1fr_90px] px-4 gap-1 py-2 font-semibold text-sm">
                        {headerGroup.headers.map((header) => {
                            return (
                                <div key={header.id} colSpan={header.colSpan} >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="**:data-[slot=table-cell]:first:w-8 max-h-96 overflow-y-auto scrollbar-hidden">
                {table.getRowModel().rows?.length ? (
                    <>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <div
                                    key={row.id}
                                    className="relative z-0 grid @sm/main:grid-cols-[1fr_120px] grid-cols-[1fr_90px] gap-1 px-4 py-1 items-center bg-white text-black rounded-md my-1"
                                    onClick={() => router.push(`/dashboard/${row.original.user.id}`)}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <div key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        )
                                    })}

                                </div>
                            )
                        })}
                    </>
                ) : (
                    <div colSpan={columns.length} className="h-24 text-center pt-10">
                        No results.
                    </div>
                )}
            </div>
            {!!viewSubmission && <SubmissionOverlay submissionInfo={viewSubmission} closeOverlay={() => setViewSubmission(false)} />}
        </div>
    )
}

export { FinalSubmissionLeaderboard, finalLeadearboardColumns }

const SubmissionOverlay = ({ submissionInfo, closeOverlay }) => {

    const [submission, setSubmission] = useState(false)

    useEffect(() => {
        async function run() {

            const { data: sub } = await getFinalSubmission(submissionInfo.id)
            setSubmission(sub);

        }
        run()
    }, [])

    return (<div className="z-100 font-inter fixed w-dvw h-dvh flex flex-col text-center items-center justify-center bg-[#0A0F1F]/60 backdrop-blur-lg top-0 left-0 gap-4 px-2" onClick={closeOverlay}>
        <Card className="w-full max-w-md max-sm:max-w-sm max-sm:py-4 gap-0!" onClick={(e) => e.stopPropagation()}>
            <CardHeader className={"max-sm:px-4"}>
                <div variant="link" className="font-medium gap-2 h-12 w-fit px-0 text-left flex items-center flex-1">
                    <div className="relative m-auto">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={submissionInfo.user.avatarUrl} alt="Profile" />
                            <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 space-y-0">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <h1 className="text-md text-ellipsis break-all max-sm:max-w-[110px] line-clamp-1">{submissionInfo.user.name}</h1>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs">
                            <div className="flex items-center gap-0.5 text-sm text-muted-foreground">
                                <AtSign className="size-3" />
                                <p className="text-ellipsis break-all line-clamp-1 max-sm:max-w-24">{submissionInfo.user.username}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <CardAction>
                    <Button variant="link" onClick={closeOverlay}>Close</Button>
                </CardAction>
            </CardHeader>
            <CardContent className={"max-sm:px-4"}>
                <div className="max-w-[32rem] text-card-foreground">
                    <h3 className="my-4 leading-none font-semibold text-left">Project Description</h3>
                    <div className="bg-card mb-4 min-h-48 text-card-foreground flex flex-col gap-6 rounded-xl border py-3 px-3 shadow-sm max-h-64 overflow-y-auto font-mono text-sm scrollbar-thin">
                        {submission ? submission?.description : "Loading..."}
                    </div>
                    <a
                        href={submission?.driveUrl}
                        className="bg-[#5381B2] shadow-[0_4px_0_0_#2965A4] text-white rounded-lg px-4 py-1 font-semibold text-sm"
                    >
                        Drive Link
                    </a>
                </div>
            </CardContent>
            <CardFooter><Button variant={"outline"} className={"mx-auto mt-6"}>{submission.score ? `${submission.score} XP EARNED` : "Under Review"}</Button></CardFooter>
        </Card>
    </div>)
}

export const UserSubmissionCard = ({ submission }) => {

    if (!submission) {
        return (<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground font-semibold"><h1>Wating for your submission.</h1></div>)
    }

    return (<Card className="w-full max-sm:py-4 pt-2 gap-0!" onClick={(e) => e.stopPropagation()}>
        <CardContent className={"max-sm:px-4"}>
            <div className="text-card-foreground flex flex-col">
                <h3 className="my-4 leading-none font-semibold text-left">Project Description</h3>
                <div className="bg-card mb-4 min-h-48 text-card-foreground flex flex-col gap-6 rounded-xl border py-3 px-3 shadow-sm max-h-64 overflow-y-auto font-mono text-sm scrollbar-thin">
                    {submission?.description}
                </div>
                <a
                    href={submission?.driveUrl}
                    className="bg-[#5381B2] w-fit shadow-[0_4px_0_0_#2965A4] text-white rounded-lg px-4 py-1 font-semibold text-sm"
                >
                    Drive Link
                </a>
            </div>
        </CardContent>
        <CardFooter><Button variant={"outline"} className={"mx-auto mt-6"}>{submission.score ? `${submission.score} XP EARNED` : "Under Review"}</Button></CardFooter>
    </Card>)
}