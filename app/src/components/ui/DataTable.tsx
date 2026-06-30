import { flexRender, type Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props<TData> = {
    table: Table<TData>
    page: number
    setPage: (page: number) => void
    pageCount: number

    filters: Record<string, string>
    setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>

    onRowClick?: (row: any) => void
}

export function DataTable<TData>({
    table,
    onRowClick,
    page,
    setPage,
    pageCount,
    filters,
    setFilters
}: Props<TData>) {
    const rows = table.getRowModel().rows

    return (
        <div className="rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-sm overflow-hidden">

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    <thead className="bg-gradient-to-r from-indigo-50/60 to-purple-50/60 border-b border-slate-200/60">

                        {/* HEADER */}
                        {table.getHeaderGroups().map(hg => (
                            <tr key={hg.id}>
                                {hg.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="p-4 text-left font-medium text-slate-700 cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-2">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}

                        {/* FILTER ROW (clean SaaS style) */}
                        <tr className="border-t border-white/40">
                            {table.getHeaderGroups()[0].headers.map(header => (
                                <th key={header.id} className="p-2">
                                    {header.column.getCanFilter() ? (
                                        <div className="relative">
                                            <input
                                                value={filters[header.column.id] ?? ""}
                                                onChange={(e) => {
                                                    setPage(1)

                                                    setFilters(prev => ({
                                                        ...prev,
                                                        [header.column.id]: e.target.value,
                                                    }))
                                                }}
                                                placeholder="Rechercher..."
                                                className="
                w-full px-2.5 py-1.5 text-xs
                rounded-lg
                bg-white/50 backdrop-blur
                border border-slate-200/60
                shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-200
                transition
              "
                                            />
                                        </div>
                                    ) : null}
                                </th>
                            ))}
                        </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {rows.map(row => (
                            <tr
                                key={row.id}
                                onClick={() => onRowClick?.(row)}
                                className="cursor-pointer hover:bg-indigo-50/40"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="p-3 text-slate-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* PAGINATION */}
            <div className="
        flex items-center justify-between
        px-4 py-3
        border-t border-slate-200
        bg-white/40
        backdrop-blur
      ">

                <div className="text-xs text-slate-500">
                    Page {table.getState().pagination.pageIndex + 1} sur {pageCount}
                </div>

                <div className="flex items-center gap-2">

                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}
                        className="p-2 rounded-lg bg-white/80 border border-slate-200 disabled:opacity-40"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= pageCount}
                        className="p-2 rounded-lg bg-white/80 border border-slate-200 disabled:opacity-40"
                    >
                        <ChevronRight size={16} />
                    </button>

                </div>
            </div>
        </div>
    )
}