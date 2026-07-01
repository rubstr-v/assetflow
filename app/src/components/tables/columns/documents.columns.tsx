import type { ColumnDef } from "@tanstack/react-table"
import { formatFileSize } from "../../../utils/formatFileSize"
import { formatDate } from "../../../utils/formatDate"
import type { SiteFile } from "../../../types/file"


export const documentColumns: ColumnDef<SiteFile>[] = [
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => {
            const type = getValue() as string

            const color =
                type === "image"
                    ? "bg-emerald-100 text-emerald-700"
                    : type === "pdf"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-700"

            return (
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
                    {type}
                </span>
            )
        },
    },
    {
        accessorKey: "size",
        header: "Taille",
        cell: ({ getValue }) => (
            <span className="text-slate-600 text-sm">
                {formatFileSize(getValue() as number)}
            </span>
        ),
    },
    {
        accessorKey: "addedDate",
        header: "Ajouté le",
        cell: ({ getValue }) => {
            return (
                <span className="text-slate-500 text-sm">
                    {formatDate(getValue() as string)}
                </span>
            )
        },
    },
]