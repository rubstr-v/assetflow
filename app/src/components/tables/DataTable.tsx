import { flexRender, type Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props<T> = {
  table: Table<T>
  page?: number
  pageCount?: number
  setPage?: (page: number) => void
  onRowClick?: (row: T) => void
}

export function DataTable<T>({
  table,
  page,
  pageCount,
  setPage,
  onRowClick,
}: Props<T>) {

  return (
    <div className="rounded-2xl border bg-white overflow-hidden">

      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-3 cursor-pointer select-none text-left"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  {{
                    asc: " ↑",
                    desc: " ↓",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              className="border-t hover:bg-slate-50 cursor-pointer"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination externe */}
      {setPage && page && pageCount && (
        <div className="flex justify-between items-center p-3 border-t">
          <div className="text-xs text-slate-500">
            Page {page} / {pageCount}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= pageCount}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}