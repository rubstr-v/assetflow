export function DataTableStats<TData>({ table }: { table: any }) {
  const total = table.getPreFilteredRowModel().rows.length
  const filtered = table.getFilteredRowModel().rows.length

  return (
    <div className="flex items-center justify-between mb-3">

      <div className="text-sm text-slate-600">
        <span className="font-medium text-slate-900">{filtered}</span>
        {" "}résultat(s)
        {filtered !== total && (
          <span className="text-slate-400">
            {" "}sur {total}
          </span>
        )}
      </div>

      {filtered !== total && (
        <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
          filtré
        </div>
      )}

    </div>
  )
}