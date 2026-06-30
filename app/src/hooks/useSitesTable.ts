import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { useState } from "react"

export function useSitesTable<TData>({
  data,
  columns,
  pageCount,
  manualPagination = false,
}: {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  pageCount?: number
  manualPagination?: boolean
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      pagination,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,

    manualPagination,        // ✅ IMPORTANT
    pageCount,               // ✅ IMPORTANT

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // ❌ IMPORTANT : NE PAS UTILISER getPaginationRowModel en mode server
    // getPaginationRowModel(): supprimé
  })

  return { table }
}