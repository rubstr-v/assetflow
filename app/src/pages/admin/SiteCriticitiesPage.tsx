import { useEffect, useState } from "react"
import {
    type SortingState
} from "@tanstack/react-table"
import { siteCriticitiesColumns } from "../../components/tables/columns/siteCriticities.columns"
import { DataTable } from "../../components/tables/DataTable"
import { useDataTable } from "../../hooks/useDataTable"


type SiteCriticity = {
    id: number
    name: string
    color: string
}


export default function SiteCriticitiesPage() {
    const [siteCriticities, setSiteCriticities] = useState<SiteCriticity[]>([])
    const [sorting, setSorting] = useState<SortingState>([])

    useEffect(() => {
        fetch("http://localhost/api/site_criticities", {
            credentials: "include"
        })
            .then(r => r.json())
            .then(data => setSiteCriticities(data.member ?? []))
    }, [])

    const table = useDataTable({
        data: siteCriticities,
        columns: siteCriticitiesColumns,
        sorting,
        onSortingChange: setSorting,
    })

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Site Criticities</h1>

            <DataTable
                table={table}
            />
        </div>
    )
}