import { useEffect, useState } from "react"
import { usersColumns } from "../../components/tables/columns/users.columns"
import { DataTable } from "../../components/tables/DataTable"
import { useDataTable } from "../../hooks/useDataTable"
import type { SortingState } from "@tanstack/react-table"

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

    const table = useDataTable({
        data: users,
        columns: usersColumns,
        sorting,
        onSortingChange: setSorting,
    })
    
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Users</h1>

            <DataTable
                table={table}
            />
        </div>
    )
}