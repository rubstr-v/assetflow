import type { ColumnDef, CellContext, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { DataTable } from "../components/ui/DataTable"
import { DataTableToolbar } from "../components/ui/DataTableToolbar"
import { DataTableStats } from "../components/ui/DataTableStats"
import { SiteModal } from "../components/ui/SiteModal"


import { useState } from "react"
import { useSitesTable } from "../hooks/useSitesTable"

type Site = {
    id: number
    name: string
    url: string
    status: "active" | "paused"
    createdAt: string
    address: string
    latitude: number
    longitude: number
}

const data: Site[] = [
    {
        id: 1,
        name: "Site Alpha",
        url: "https://alpha.com",
        status: "active",
        createdAt: "2026-06-01",
        address: "123 Rue de Paris, 75000 Paris",
        latitude: 48.8566,
        longitude: 2.3522
    },
    {
        id: 2,
        name: "Site Beta",
        url: "https://beta.com",
        status: "paused",
        createdAt: "2026-06-10",
        address: "456 Avenue des Champs-Élysées, 75008 Paris",
        latitude: 48.8666,
        longitude: 2.3322
    },
    {
        id: 3,
        name: "Site Beta",
        url: "https://beta.com",
        status: "paused",
        createdAt: "2026-06-10",
        address: "789 Boulevard Saint-Germain, 75005 Paris",
        latitude: 48.8534,
        longitude: 2.3488
    },
    {
        id: 4,
        name: "Site Beta",
        url: "https://beta.com",
        status: "active",
        createdAt: "2026-06-10",
        address: "101 Rue de Rivoli, 75001 Paris",
        latitude: 48.8634,
        longitude: 2.3354
    },
]

const columns: ColumnDef<Site>[] = [
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: (info: CellContext<Site, unknown>) => (
            <span className="text-slate-500">
                {info.getValue() as string}
            </span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (info: CellContext<Site, unknown>) => {
            const status = info.getValue() as string

            return (
                <span
                    className={[
                        "px-2 py-1 rounded-full text-xs font-medium",
                        status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700",
                    ].join(" ")}
                >
                    {status}
                </span>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "Créé le",
    },
]

export default function SitesPage() {
    const { table } = useSitesTable({
        data,
        columns,
    })
    const [selectedSite, setSelectedSite] = useState<Site | null>(null)

    return (
        <div className="space-y-4">

            <DataTableToolbar table={table} />

            <DataTableStats table={table} />

            <DataTable table={table} onRowClick={(row) => setSelectedSite(row.original)} />


            {selectedSite && (
                <SiteModal
                    site={selectedSite}
                    onClose={() => setSelectedSite(null)}
                />
            )}
        </div>
    )
}