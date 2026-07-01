import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table"

type UseDataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T, any>[]

  manualSorting?: boolean
  manualPagination?: boolean

  pageCount?: number

  sorting: SortingState
  onSortingChange: (updater: SortingState | ((old: SortingState) => SortingState)) => void

  pagination?: PaginationState
  onPaginationChange?: (updater: PaginationState) => void
}

export function useDataTable<T>({
  data,
  columns,
  manualSorting = false,
  manualPagination = false,
  pageCount,
  sorting,
  onSortingChange,
  pagination,
  onPaginationChange,
}: UseDataTableProps<T>) {

  return useReactTable({
    data,
    columns,

    state: {
      sorting,
      pagination: pagination ?? {
        pageIndex: 0,
        pageSize: 10,
      },
    },

    onSortingChange,
    onPaginationChange,

    manualSorting,
    manualPagination,

    pageCount,

    getCoreRowModel: getCoreRowModel(),

    ...(manualSorting ? {} : { getSortedRowModel: getSortedRowModel() }),
    ...(manualPagination ? {} : { getPaginationRowModel: getPaginationRowModel() }),
  })
}