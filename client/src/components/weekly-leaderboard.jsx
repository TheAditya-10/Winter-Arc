"use client"

import * as React from "react"

import { UserRound, AtSign, CircleStar } from "lucide-react";
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button"

import { ButtonGroup } from "@/components/ui/button-group"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const weeklyleadearboardColumns = [
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
        accessorKey: "weekId",
        header: null,
        cell: null,
        enableHiding: false,
    },
    {
        accessorKey: "view",
        header: () => <div className="w-full text-center">Drive Link</div>,
        cell: ({ row }) => (<a onClick={(e) => e.stopPropagation()} className="w-full flex justify-center items-center gap-1" href={row.original.driveUrl} target="_blank"><Button variant={"link"} className={"text-primary-foreground"}>view</Button></a>)
    }
]


export function WeeklyLeaderboardTable(
    {
        data: initialData,
        columns,
        weeklyInfo
    }
) {

    const router = useRouter()

    const [data, setData] = React.useState(() => initialData)
    const [columnFilters, setColumnFilters] = React.useState([
        { id: "weekId", value: "week-one" }
    ])
    const [columnVisibility, setColumnVisibility] = React.useState({
        weekId: false, // hide in table but still accessible
    })

    const weekId = columnFilters.reduce((acc, obj) => {
        if (obj?.id == "weekId") {
            return obj?.value
        }
        return acc
    }, "week-one")

    let youRow = null;
    let topThree = [];

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            columnVisibility,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div className="font-poppins relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 @2xl/main:w-[36rem] @2xl/main:self-center pb-2 w-full">
            <div className="flex items-center justify-center @max-sm/main:scale-80 py-4 gap-2 text-sm">
                <ButtonGroup>
                    <Button
                        variant={table.getColumn("weekId")?.getFilterValue() == "week-one" ? "secondary" : "ghost"}
                        onClick={() => {
                            table.getColumn("weekId")?.setFilterValue("week-one")
                        }}
                    >WEEK-1</Button>
                    <Button
                        variant={table.getColumn("weekId")?.getFilterValue() == "week-two" ? "secondary" : "ghost"}
                        onClick={() => {
                            table.getColumn("weekId")?.setFilterValue("week-two")
                        }}>WEEK-2</Button>
                    <Button
                        variant={table.getColumn("weekId")?.getFilterValue() == "week-three" ? "secondary" : "ghost"}
                        onClick={() => {
                            table.getColumn("weekId")?.setFilterValue("week-three")
                        }}>WEEK-3</Button>
                    <Button
                        variant={table.getColumn("weekId")?.getFilterValue() == "week-four" ? "secondary" : "ghost"}
                        onClick={() => {
                            table.getColumn("weekId")?.setFilterValue("week-four")
                        }}>WEEK-4</Button>
                </ButtonGroup>
            </div>
            {(weeklyInfo[weekId].state == "upcoming")
                ? <Button variant={"outline"} className={"text-lg font-medium my-4 mx-auto px-8 py-4 backdrop-blur-sm"}>Live From {weeklyInfo[weekId].dayNumber} of January.</Button>
                : (<div className="flex flex-col-reverse gap-4">
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
                                    {table.getRowModel().rows.map((row, rowIndex) => {
                                        if (weeklyInfo[weekId]?.winners?.includes(row.id)) {
                                            topThree[weeklyInfo[weekId]?.winners?.indexOf(row.id)] = row
                                            return
                                        }
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
                    </div>
                    {!!topThree[2]
                        ? (<div className="flex items-end justify-center gap-0 pt-8 font-inter">
                            <div
                                className="w-28 h-24 pt-6 bg-[#1E2237] rounded-l-lg flex flex-col items-center relative cursor-pointer"
                                onClick={() => router.push(`/dashboard/${topThree[1].original.user.id}`)}>
                                <Image src="/leaderboard/second.svg" alt="second" width={16} height={16} className="z-10" />
                                <Avatar className="size-16 absolute -top-8 border-2 border-[#009BD6]">
                                    <AvatarImage src={topThree[1].original.user.avatarUrl} alt="Profile" />
                                    <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                                </Avatar>
                                <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium">{topThree[1].original.user.name}</div>
                                <div className="text-xs text-muted-foreground flex gap-0.5 items-center px-2"><AtSign className="size-3" /><p className="line-clamp-1 text-ellipsis break-all max-w-16">{topThree[1].original.user.username}</p></div>
                                <a onClick={(e) => e.stopPropagation()} className="w-full flex justify-center items-center gap-1" href={topThree[2].original.driveUrl} target="_blank"><Button variant={"link"} className={"text-[#009BD6] h-fit p-0"}>view</Button></a>
                            </div>
                            <div
                                className="w-28 h-32 pt-6 bg-[#252A40] rounded-t-lg flex flex-col items-center justify-between pb-1 relative cursor-pointer"
                                onClick={() => router.push(`/dashboard/${topThree[0].original.user.id}`)}>
                                <Image src="/leaderboard/first.svg" alt="second" width={16} height={16} className="z-10" />
                                <Image src="/leaderboard/crown.svg" alt="crown" width={24} height={24} className="z-10 absolute -top-12" />
                                <Avatar className="size-16 absolute -top-8 border-2 border-[#205F94]">
                                    <AvatarImage src={topThree[0].original.user.avatarUrl} alt="Profile" />
                                    <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                                </Avatar>
                                <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium">{topThree[0].original.user.name}</div>
                                <div className="text-xs text-muted-foreground flex gap-0.5 items-center px-2"><AtSign className="size-3" /><p className="line-clamp-1 text-ellipsis break-all max-w-16">{topThree[0].original.user.username}</p></div>
                                <a onClick={(e) => e.stopPropagation()} className="w-full flex justify-center items-center gap-1" href={topThree[2].original.driveUrl} target="_blank"><Button variant={"link"} className={"text-[#FFAA00] h-fit p-0"}>view</Button></a>
                            </div>
                            <div
                                className="w-28 h-24 pt-6 bg-[#1E2237] rounded-r-lg flex flex-col items-center relative cursor-pointer"
                                onClick={() => router.push(`/dashboard/${topThree[2].original.user.id}`)}>
                                <Image src="/leaderboard/third.svg" alt="second" width={16} height={16} className="z-10" />
                                <Avatar className="size-16 absolute -top-8 border-2 border-[#00D95F]">
                                    <AvatarImage src={topThree[2].original.user.avatarUrl} alt="Profile" />
                                    <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                                </Avatar>
                                <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium">{topThree[2].original.user.name}</div>
                                <div className="text-xs text-muted-foreground flex gap-0.5 items-center px-2"><AtSign className="size-3" /><p className="line-clamp-1 text-ellipsis break-all max-w-16">{topThree[2].original.user.username}</p></div>
                                <a onClick={(e) => e.stopPropagation()} className="w-full flex justify-center items-center gap-1" href={topThree[2].original.driveUrl} target="_blank"><Button variant={"link"} className={"text-[#00D95F] h-fit p-0"}>view</Button></a>
                            </div>
                        </div>)
                        : (<>{
                            !(weeklyInfo[weekId].state == "active") && <Button variant={"outline"} className={"text-lg font-medium my-4 mx-auto px-8 py-4 backdrop-blur-sm"}>Winners Announce Soon</Button>
                        }</>)
                    }
                </div>)}
        </div>
    );
}


