import { useEffect, useState } from "react"
import {
    type SortingState
} from "@tanstack/react-table"
import { siteCategoriesColumns } from "../../components/tables/columns/siteCategories.columns"
import { DataTable } from "../../components/tables/DataTable"
import { useDataTable } from "../../hooks/useDataTable"


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

    const table = useDataTable({
        data: siteCategories,
        columns: siteCategoriesColumns,
        sorting,
        onSortingChange: setSorting,
    })

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Site Categories</h1>

            <DataTable
                table={table}
            />
        </div>
    )
}
