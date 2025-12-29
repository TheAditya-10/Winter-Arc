"use client"

import * as React from "react"

import { UserRound, AtSign, CircleStar } from "lucide-react";
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ButtonGroup } from "@/components/ui/button-group"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import Image from "next/image";

export const leadearboardColumns = [
    {
        accessorKey: "rank",
        header: () => <div className="w-full text-center">#<span className="hidden sm:inline">Rank</span></div>,
        cell: ({ row, table }) => {
            const rank = (table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id == row.id) || 0) + 1
            return (<div className="w-full text-center">#{table.getColumn("username")?.getFilterValue() ? "#" : rank}</div>)
        }
    },
    {
        accessorKey: "name",
        header: () => <div className="w-full text-left">User</div>,
        cell: ({ row }) => {
            return (<div variant="link" className="font-medium gap-2 h-12 w-fit px-0 text-left flex items-center flex-1">
                <div className="relative m-auto">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={row.original.avatarUrl} alt="Profile" />
                        <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 space-y-0">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <h1 className="text-md text-ellipsis break-all max-sm:max-w-[110px] line-clamp-1">{row.original.name}</h1>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-0.5 text-sm text-muted">
                            <AtSign className="size-3" />
                            <p className="text-ellipsis break-all line-clamp-1 max-sm:max-w-24">{row.original.username}</p>
                        </div>
                    </div>
                </div>
            </div>)
        },
        enableHiding: false,
    },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => {
            return (<Button variant="link" className="text-foreground w-fit px-0 text-left">
                <AtSign className="size-3" />
                {row.original.username}
            </Button>)
        },
        enableHiding: false,
    },
    {
        accessorKey: "points",
        header: () => <div className="w-full text-center">XP</div>,
        cell: ({ row }) => (<div className="w-full flex justify-center items-center gap-1">{row.original.points || 0} <CircleStar size={16} /></div>)
    },
    {
        accessorKey: "weeklyPoints",
        header: () => <div className="w-full text-center">WP</div>,
        cell: ({ row }) => (<div className="w-full flex justify-center items-center gap-1">{row.original.weeklyPoints || 0} <CircleStar size={16} /></div>)
    },
]


export function LeaderboardTable(
    {
        data: initialData,
        columns,
        userId,
    }
) {

    const router = useRouter()

    const [data, setData] = React.useState(() => initialData)
    const [columnFilters, setColumnFilters] = React.useState([])
    const [sorting, setSorting] = React.useState([{ id: "points", desc: true }])
    const [columnVisibility, setColumnVisibility] = React.useState({
        username: false, // hide in table but still accessible
        weeklyPoints: false,
    })

    let youRow = null;
    let topThree = [];

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            columnVisibility,
            sorting
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })


    return (
        <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 @2xl/main:w-[42rem] @2xl/main:self-center pb-2">
            <div className="flex items-center justify-between py-4 gap-2">
                <Input
                    placeholder="Search by username..."
                    value={(table.getColumn("username")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("username")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <ButtonGroup>
                    <Button
                        variant={columnVisibility.weeklyPoints == undefined ? "ghost" : "secondary"}
                        onClick={() => {
                            setSorting([{ id: "points", desc: true }])
                            setColumnVisibility({ username: false, weeklyPoints: false })
                        }}>Daily</Button>
                    <Button
                        variant={columnVisibility.weeklyPoints == undefined ? "secondary" : "ghost"}
                        onClick={() => {
                            setSorting([{ id: "weeklyPoints", desc: true }])
                            setColumnVisibility({ username: false, points: false })
                        }}
                    >Weekly</Button>
                </ButtonGroup>
            </div>
            <div className="flex flex-col-reverse gap-4">
                <div className="rounded-lg h-fit relative overflow-y-auto">
                    <div className="bg-muted/20 sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <div key={headerGroup.id} className="grid @sm/main:grid-cols-[80px_1fr_120px] grid-cols-[40px_1fr_80px] px-1 gap-1 py-2 font-semibold text-sm">
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
                                    if (row.id == userId) {
                                        youRow = row
                                    }
                                    if (rowIndex < 3 && !table.getColumn("username")?.getFilterValue()) {
                                        topThree.push(row)
                                        return
                                    }
                                    return (
                                        <div
                                            key={row.id}
                                            className="relative z-0 grid @sm/main:grid-cols-[80px_1fr_120px] grid-cols-[40px_1fr_80px] gap-1 px-1 py-1 items-center bg-white text-black rounded-md my-1"
                                            onClick={() => router.push(`/dashboard/${row.id}`)}
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
                                {youRow && (<div
                                    className="sticky bottom-0 z-10 bg-[#205F94] text-white grid @sm/main:grid-cols-[80px_1fr_120px] grid-cols-[40px_1fr_80px] gap-1 px-1 py-1 items-center rounded-md mt-1"
                                >
                                    {youRow.getVisibleCells().map((cell) => {
                                        return (
                                            <div key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        )
                                    })}

                                </div>
                                )}
                            </>
                        ) : (
                            <div colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </div>
                        )}
                    </div>
                </div>
                {!!topThree[2] &&
                    <div className="flex items-end justify-center gap-0 pt-8">
                        <div
                            className="w-28 h-24 pt-6 bg-[#1E2237] rounded-l-lg flex flex-col items-center relative cursor-pointer"
                            onClick={() => router.push(`/dashboard/${topThree[1].id}`)}>
                            <Image src="/leaderboard/second.svg" alt="second" width={16} height={16} className="z-10" />
                            <Avatar className="size-16 absolute -top-8 border-2 border-[#009BD6]">
                                <AvatarImage src={topThree[1].original.avatarUrl} alt="Profile" />
                                <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                            </Avatar>
                            <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium">{topThree[1].original.name}</div>
                            <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium text-[#009BD6]">{columnVisibility.weeklyPoints == undefined ? (topThree[1].original.weeklyPoints || 0) : (topThree[1].original.points || 0)}</div>
                            <div className="text-xs text-muted-foreground flex gap-0.5 items-center px-2"><AtSign className="size-3" /><p className="line-clamp-1 text-ellipsis break-all max-w-16">{topThree[1].original.username}</p></div>
                        </div>
                        <div
                            className="w-28 h-32 pt-6 bg-[#252A40] rounded-t-lg flex flex-col items-center justify-between pb-1 relative cursor-pointer"
                            onClick={() => router.push(`/dashboard/${topThree[0].id}`)}>
                            <Image src="/leaderboard/first.svg" alt="second" width={16} height={16} className="z-10" />
                            <Image src="/leaderboard/crown.svg" alt="crown" width={24} height={24} className="z-10 absolute -top-12" />
                            <Avatar className="size-16 absolute -top-8 border-2 border-[#205F94]">
                                <AvatarImage src={topThree[0].original.avatarUrl} alt="Profile" />
                                <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                            </Avatar>
                            <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium">{topThree[0].original.name}</div>
                            <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium text-[#FFAA00]">{columnVisibility.weeklyPoints == undefined ? (topThree[0].original.weeklyPoints || 0) : (topThree[0].original.points || 0)}</div>
                            <div className="text-xs text-muted-foreground flex gap-0.5 items-center px-2"><AtSign className="size-3" /><p className="line-clamp-1 text-ellipsis break-all max-w-16">{topThree[0].original.username}</p></div>
                        </div>
                        <div
                            className="w-28 h-24 pt-6 bg-[#1E2237] rounded-r-lg flex flex-col items-center relative cursor-pointer"
                            onClick={() => router.push(`/dashboard/${topThree[2].id}`)}>
                            <Image src="/leaderboard/third.svg" alt="second" width={16} height={16} className="z-10" />
                            <Avatar className="size-16 absolute -top-8 border-2 border-[#00D95F]">
                                <AvatarImage src={topThree[2].original.avatarUrl} alt="Profile" />
                                <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                            </Avatar>
                            <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium">{topThree[2].original.name}</div>
                            <div className="text-sm line-clamp-1 text-ellipsis break-all px-2 font-medium text-[#00D95F]">{columnVisibility.weeklyPoints == undefined ? (topThree[2].original.weeklyPoints || 0) : (topThree[2].original.points || 0)}</div>
                            <div className="text-xs text-muted-foreground flex gap-0.5 items-center px-2"><AtSign className="size-3" /><p className="line-clamp-1 text-ellipsis break-all max-w-16">{topThree[2].original.username}</p></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}


