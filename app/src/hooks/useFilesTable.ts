import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import type { SiteFile } from "../types/file"


export function useFilesTable(data: SiteFile[], columns: any) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return { table }
}