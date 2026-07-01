import { useEffect, useState } from "react"
import {
    type SortingState
} from "@tanstack/react-table"
import { siteTypesColumns } from "../../components/tables/columns/siteTypes.columns"
import { DataTable } from "../../components/tables/DataTable"
import { useDataTable } from "../../hooks/useDataTable"


type SiteType = {
    id: number
    name: string
    color: string
}


export default function SiteTypesPage() {
    const [siteTypes, setSiteTypes] = useState<SiteType[]>([])
    const [sorting, setSorting] = useState<SortingState>([])

    useEffect(() => {
        fetch("http://localhost/api/site_types", {
            credentials: "include"
        })
            .then(r => r.json())
            .then(data => setSiteTypes(data.member ?? []))
    }, [])

    const table = useDataTable({
        data: siteTypes,
        columns: siteTypesColumns,
        sorting,
        onSortingChange: setSorting,
    })

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Site Types</h1>

            <DataTable
                table={table}
            />
        </div>
    )
}