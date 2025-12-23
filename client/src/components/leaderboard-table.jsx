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

export const leadearboardColumns = [
    {
        accessorKey: "rank",
        header: () => <div className="w-full text-center">#</div>,
        cell: ({ row, table }) => {
            const rank = (table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id == row.id) || 0) + 1
            return (<div className="w-full text-center">{rank}</div>)
        }
    },
    {
        accessorKey: "name",
        header: () => <div className="w-full text-left">User</div>,
        cell: ({ row }) => {
            return (<Button variant="link" className="text-foreground h-12 w-fit px-0 text-left flex items-center flex-1">
                <div className="relative m-auto">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={row.original.avatarUrl} alt="Profile" />
                        <AvatarFallback className="text-2xl"><UserRound size={60} /></AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 space-y-0">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <h1 className="text-md font-bold">{row.original.name}</h1>
                    </div>
                    <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-0.5 text-sm text-muted-foreground">
                            <AtSign className="size-3" />
                            {row.original.username}
                        </div>
                    </div>
                </div>
            </Button>)
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
        <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 @2xl/main:w-[42rem] @2xl/main:self-center">
            <div className="flex items-center justify-between py-4">
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
            <div className="rounded-lg border h-fit relative overflow-y-auto">
                <div className="bg-muted sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <div key={headerGroup.id} className="grid @sm/main:grid-cols-[80px_1fr_120px] grid-cols-[40px_1fr_80px] px-1 gap-1 py-2 font-semibold">
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
                                if (row.id == userId) {
                                    youRow = row
                                }
                                return (
                                    <div
                                        key={row.id}
                                        className="relative z-0 even:bg-muted/20 grid @sm/main:grid-cols-[80px_1fr_120px] grid-cols-[40px_1fr_80px] gap-1 px-1 py-1 items-center"
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
                                className="sticky bottom-0 z-10 bg-black grid grid-cols-[80px_1fr_120px] gap-1 px-1 py-1 items-center"
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
        </div>
    );
}


