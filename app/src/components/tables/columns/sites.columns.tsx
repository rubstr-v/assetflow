import type { ColumnDef } from "@tanstack/react-table"

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

export const sitesColumns: ColumnDef<Site>[] = [
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
