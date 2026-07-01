import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    type ColumnDef,
    type SortingState,
} from "@tanstack/react-table"

export function useSitesTable<TData>({
    data,
    columns,
    pageCount,
    manualPagination = false,
    manualSorting = false,
    sorting,
    onSortingChange,
}: {
    data: TData[]
    columns: ColumnDef<TData, any>[]
    pageCount?: number
    manualPagination?: boolean
    manualSorting?: boolean
    sorting: SortingState
    onSortingChange: (updater: SortingState | ((old: SortingState) => SortingState)) => void
}) {

    const table = useReactTable({
        data,
        columns,

        state: {
            sorting,
        },

        onSortingChange,

        manualPagination,
        manualSorting,

        pageCount,

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), // 👈 IMPORTANT
    })

    return { table }
}