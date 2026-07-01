import { type ColumnDef } from "@tanstack/react-table"

type SiteTypes = {
  id: number
  name: string
  color: string
}

export const siteTypesColumns: ColumnDef<SiteTypes>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: row.original.color }}
        />
        <span>{row.original.color}</span>
      </div>
    ),
  },
]