"use client"

import * as React from "react"

import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from "@tabler/icons-react"
import { UserRound, AtSign, CircleStar } from "lucide-react";
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { ButtonGroup } from "@/components/ui/button-group"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from "next/navigation";


export const leadearboardColumns = [
    {
        accessorKey: "rank",
        header: () => <div className="w-full text-center">Rank</div>,
        cell: ({ row, table }) => (<div className="w-full text-center">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow)=> flatRow.id == row.id) || 0) + 1}</div>)
    },
    {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
            return (<Button variant="link" className="text-foreground h-12 w-fit px-0 text-left flex items-center">
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
        cell: ({ row }) => (<div className="w-full text-center flex justify-center items-center gap-1">{row.original.points} <CircleStar size={16} /></div>)
    },
]


export function LeaderboardTable(
    {
        data: initialData,
        columns,
    }
) {

    const router = useRouter()

    const [data, setData] = React.useState(() => initialData)
    const [columnFilters, setColumnFilters] = React.useState([])
    const [sorting, setSorting] = React.useState([{ id: "points", desc: true }])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [columnVisibility, setColumnVisibility] = React.useState({
        username: false, // hide in table but still accessible
    })


    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            pagination,
            columnVisibility,
            sorting
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
                        variant={columnVisibility.username? "ghost" : "secondary"}
                        onClick={() => {
                            setSorting([{ id: "points", desc: true }])
                            setColumnVisibility({ username: false, points: true })
                        }}>Daily</Button>
                    <Button
                        variant={columnVisibility.username? "secondary" : "ghost"}
                        onClick={() => {
                            setSorting([{ id: "points", desc: false }])
                            setColumnVisibility({ username: true, points: false })
                        }}
                    >Weekly</Button>
                </ButtonGroup>
            </div>
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="**:data-[slot=table-cell]:first:w-8">
                        {table.getRowModel().rows?.length ? (
                            <>
                                {table.getRowModel().rows.map((row, i) => (
                                    <TableRow
                                        key={row.id}
                                        className="relative z-0 even:bg-muted/20"
                                        onClick={() => router.push(`/dashboard/${row.id}`)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}

                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-4">
                <div className="flex w-full items-center gap-8 @lg/main:w-fit">
                    <div className="hidden items-center gap-2 @lg/main:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                            Rows per page
                        </Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}>
                            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="ml-auto flex items-center gap-2 @lg/main:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 @lg/main:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}>
                            <span className="sr-only">Go to first page</span>
                            <IconChevronsLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}>
                            <span className="sr-only">Go to previous page</span>
                            <IconChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}>
                            <span className="sr-only">Go to next page</span>
                            <IconChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 @lg/main:flex"
                            size="icon"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}>
                            <span className="sr-only">Go to last page</span>
                            <IconChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


