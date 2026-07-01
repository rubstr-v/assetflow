import { useEffect, useMemo, useState } from "react"
import {
    flexRender,
    type ColumnDef,
    type SortingState
} from "@tanstack/react-table"
import { useSitesTable } from "../../hooks/useSitesTable"


type SiteCategory = {
    id: number
    name: string
    color: string
}


export default function SiteCategoriesPage() {
    const [siteCategories, setSiteCategories] = useState<SiteCategory[]>([])
    const [sorting, setSorting] = useState<SortingState>([])

    useEffect(() => {
        fetch("http://localhost/api/site_categories", {
            credentials: "include"
        })
            .then(r => r.json())
            .then(data => setSiteCategories(data.member ?? []))
    }, [])

    const columns = useMemo<ColumnDef<SiteCategory>[]>(
        () => [
            {
                header: "ID",
                accessorKey: "id"
            },
            {
                header: "Name",
                accessorKey: "name"
            },
            {
                header: "Couleur",
                accessorKey: "color"
            },
        ],
        []
    )

    const { table } = useSitesTable({
        data: siteCategories,
        columns,
        sorting,
        onSortingChange: setSorting,
    })

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Site Categories</h1>

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