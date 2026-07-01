import { useEffect, useMemo, useState } from "react"
import {
    flexRender,
    type ColumnDef,
    type SortingState
} from "@tanstack/react-table"
import { useSitesTable } from "../../hooks/useSitesTable"


type User = {
    id: number
    email: string
    firstname?: string
    lastname?: string
    roles: string[]
    dateCreated?: string
    company?: {
        id: number
        name?: string
    }
}

function formatRole(role: string) {
    switch (role) {
        case "ROLE_ADMIN":
            return "Admin"
        case "ROLE_USER":
            return "User"
        case "ROLE_MEMBER":
            return "Member"
        default:
            return role
    }
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [sorting, setSorting] = useState<SortingState>([])

    useEffect(() => {
        fetch("http://localhost/api/users", {
            credentials: "include"
        })
            .then(r => r.json())
            .then(data => setUsers(data.member ?? []))
    }, [])

    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                header: "ID",
                accessorKey: "id"
            },
            {
                header: "Email",
                accessorKey: "email"
            },
            {
                header: "Name",
                cell: ({ row }) =>
                    `${row.original.firstname ?? ""} ${row.original.lastname ?? ""}`
            },
            {
                header: "Company",
                cell: ({ row }) => row.original.company?.name ?? "—"
            },
            {
                header: "Created",
                accessorFn: (row) =>
                    row.dateCreated ? new Date(row.dateCreated).getTime() : 0,
                id: "dateCreated",
                cell: ({ getValue }) => {
                    const value = getValue<number>()
                    return value
                        ? new Date(value).toLocaleDateString()
                        : "—"
                }
            },
            {
                header: "Roles",
                cell: ({ row }) => (
                    <div className="flex flex-wrap gap-1">
                        {row.original.roles.map(r => (
                            <span
                                key={r}
                                className={[
                                    "px-2 py-1 rounded-md text-xs font-medium",
                                    r === "ROLE_ADMIN"
                                        ? "bg-red-100 text-red-700"
                                        : r === "ROLE_MEMBER"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-slate-100 text-slate-700"
                                ].join(" ")}
                            >
                                {formatRole(r)}
                            </span>
                        ))}
                    </div>
                )
            }
        ],
        []
    )

    const { table } = useSitesTable({
        data: users,
        columns,
        sorting,
        onSortingChange: setSorting,
    })

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Users</h1>

            <div className="bg-white border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-left">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="p-3 cursor-pointer select-none"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        {{
                                            asc: " ↑",
                                            desc: " ↓"
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-t">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="p-3">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}