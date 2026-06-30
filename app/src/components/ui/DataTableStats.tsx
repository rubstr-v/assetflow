export function DataTableStats({
  totalItems,
  page,
  pageSize,
}: {
  totalItems: number
  page: number
  pageSize: number
}) {
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  const isEmpty = totalItems === 0

  return (
    <div className="flex items-center justify-between mb-3 text-sm">

      <div className="text-slate-600 flex items-center gap-2 flex-wrap">

        {!isEmpty && (
          <>
            <span className="font-semibold text-slate-900">
              {totalItems}
            </span>

            <span>éléments — showing</span>

            <span className="font-medium text-slate-800">
              {start} to {end}
            </span>
          </>
        )}

        {isEmpty && (
          <span className="text-slate-500">0 éléments</span>
        )}
      </div>

    </div>
  )
}