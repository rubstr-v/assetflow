import type { ColumnDef, CellContext, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { DataTable } from "../components/ui/DataTable"
import { DataTableToolbar } from "../components/ui/DataTableToolbar"
import { DataTableStats } from "../components/ui/DataTableStats"
import { SiteModal } from "../components/ui/SiteModal"
import { getSites } from "../api/sites"

import { useEffect, useMemo, useState } from "react"
import { useSitesTable } from "../hooks/useSitesTable"

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


const columns: ColumnDef<Site>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        id: "entity.name",
        accessorKey: "entity.name",
        header: "Société",
        cell: ({ row }) => {
            const name = row.original.entity?.name
            const color = row.original.entity?.color ?? "#64748b"

            if (!name) return null

            return (
                <div className="flex items-center gap-2">
                    <span
                        className="w-1.5 h-5 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-slate-700">{name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "name",
        header: "Site",
    },
    {
        accessorKey: "address",
        header: "Adresse",
    },
    {
        accessorKey: "siteType.name",
        header: "Type de site",
        cell: ({ row }) => {
            const name = row.original.siteType?.name
            const color = row.original.siteType?.color ?? "#64748b"

            if (!name) return null

            return (
                <span
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
                    style={{
                        color: color,
                        backgroundColor: `${color}15`,
                        boxShadow: `inset 0 0 0 1px ${color}30`,
                    }}
                >
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <span className="truncate max-w-[140px]">
                        {name}
                    </span>
                </span>
            )
        },
    },
    {
        accessorKey: "numberEmployees",
        header: "Employés",
    },
    {
        accessorKey: "supplier",
        header: "Prestataire",
    },
    {
        accessorKey: "contractExpirationDate",
        header: "Fin contrat",
    },
    {
        accessorKey: "siteManager.fullName",
        header: "Responsable site",
    },
    {
        accessorKey: "safetyManager.fullName",
        header: "Responsable sûreté",
    },
    {
        accessorKey: "securityManager.fullName",
        header: "Responsable sécurité",
    },
]



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

    const { table } = useSitesTable({
        data: sites,
        columns,
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
                filters={filters}
                setFilters={setFilters}
                onRowClick={(row) => setSelectedSite(row.original)}
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