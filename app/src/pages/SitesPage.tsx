import type { SortingState } from "@tanstack/react-table"
import { DataTable } from "../components/tables/DataTable"
import { DataTableToolbar } from "../components/ui/DataTableToolbar"
import { DataTableStats } from "../components/ui/DataTableStats"
import { SiteModal } from "../components/ui/SiteModal"
import { getSites } from "../api/sites"

import { useEffect, useMemo, useState } from "react"
import { sitesColumns } from "../components/tables/columns/sites.columns"
import { useDataTable } from "../hooks/useDataTable"

type Site = {
    id: number
    name: string
    address: string
    latitude: number | null
    longitude: number | null
    numberEmployees: number | null
    contractExpirationDate: string | null
    supplier: string | null
}





export default function SitesPage() {

    const [sites, setSites] = useState<Site[]>([])
    const [totalItems, setTotalItems] = useState(0)
    const [filters, setFilters] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [refreshKey, setRefreshKey] = useState(0)

    const [siteTypes, setSiteTypes] = useState([])
    const [siteCriticities, setSiteCriticities] = useState([])
    const [siteCategories, setSiteCategories] = useState([])
    const [entities, setEntities] = useState([])

    useEffect(() => {
        getSites(page, pageSize, filters, sorting).then((res) => {
            setSites(res.sites)
            setTotalItems(res.totalItems)
        })
    }, [page, filters, sorting, refreshKey])

    const selects = useMemo(() => [
        {
            label: "types",
            filterKey: "siteType.id",
            options: (siteTypes ?? []).map(t => ({
                value: String(t.id),
                label: t.name,
            })),
        },
        {
            label: "criticités",
            filterKey: "siteCriticity.id",
            options: (siteCriticities ?? []).map(c => ({
                value: String(c.id),
                label: c.name,
            })),
        },
        {
            label: "catégories",
            filterKey: "siteCategory.id",
            options: (siteCategories ?? []).map(c => ({
                value: String(c.id),
                label: c.name,
            })),
        },
        {
            label: "entités",
            filterKey: "entity.id",
            options: (entities ?? []).map(e => ({
                value: String(e.id),
                label: e.name,
            })),
        },
    ], [
        siteTypes,
        siteCriticities,
        siteCategories,
        entities
    ])

    useEffect(() => {
        Promise.all([
            fetch("http://localhost/api/site_types").then(r => r.json()),
            fetch("http://localhost/api/site_criticities").then(r => r.json()),
            fetch("http://localhost/api/site_categories").then(r => r.json()),
            fetch("http://localhost/api/entities").then(r => r.json()),
        ]).then(([types, criticities, categories, entities]) => {
            setSiteTypes(types.member)
            setSiteCriticities(criticities.member)
            setSiteCategories(categories.member)
            setEntities(entities.member)
        })
    }, [])

    const table = useDataTable({
        data: sites,
        columns: sitesColumns,

        manualPagination: true,
        manualSorting: true,

        pageCount: Math.ceil(totalItems / pageSize),

        sorting,
        onSortingChange: setSorting,
    })

    const [selectedSite, setSelectedSite] = useState<Site | null>(null)
    return (
        <div className="space-y-4">

            <DataTableToolbar
                table={table}
                filters={filters}
                setFilters={setFilters}
                setPage={setPage}
                selects={selects}
            />

            <DataTableStats
                totalItems={totalItems}
                page={page}
                pageSize={pageSize}
            />

            <DataTable
                table={table}
                page={page}
                setPage={setPage}
                pageCount={Math.ceil(totalItems / pageSize)}
                onRowClick={(row) => setSelectedSite(row)}
            />

            {selectedSite && (
                <SiteModal
                    site={selectedSite}
                    onClose={() => setSelectedSite(null)}
                    onSaved={() => setRefreshKey(k => k + 1)}
                    siteTypes={siteTypes}
                    siteCriticities={siteCriticities}
                    siteCategories={siteCategories}
                    entities={entities}
                />
            )}
        </div>
    )
}