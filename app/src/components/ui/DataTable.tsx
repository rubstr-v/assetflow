import { flexRender, type Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function DataTable<TData>({
    table,
    onRowClick,
}: {
    table: Table<TData>,
    onRowClick?: (row: any) => void
}) {
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
                                                value={(header.column.getFilterValue() as string) ?? ""}
                                                onChange={(e) =>
                                                    header.column.setFilterValue(e.target.value)
                                                }
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
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                onClick={() => onRowClick?.(row)}
                                className="cursor-pointer hover:bg-indigo-50/40"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="p-3 text-slate-700 group-hover:text-slate-900"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
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
                    Page {table.getState().pagination.pageIndex + 1}
                </div>

                <div className="flex items-center gap-2">

                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="
              p-2 rounded-lg
              bg-white/80 border border-slate-200
              hover:bg-indigo-50 hover:border-indigo-200
              disabled:opacity-40
              transition
            "
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="
              p-2 rounded-lg
              bg-white/80 border border-slate-200
              hover:bg-indigo-50 hover:border-indigo-200
              disabled:opacity-40
              transition
            "
                    >
                        <ChevronRight size={16} />
                    </button>

                </div>
            </div>
        </div>
    )
}