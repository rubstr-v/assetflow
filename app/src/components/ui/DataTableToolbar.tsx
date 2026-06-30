import type { Table } from "@tanstack/react-table"

const selectBase =
  "px-3 py-2 rounded-xl bg-white/70 border border-slate-200 text-sm shadow-sm " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"

type FilterSelect = {
    label: string
    filterKey: string
    options: {
        value: string
        label: string
    }[]
}

type Props<TData> = {
    table: Table<TData>

    filters: Record<string, string>
    setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>

    setPage: (page: number) => void

    selects: FilterSelect[]
}

export function DataTableToolbar<TData>({
  table,
  filters,
  setFilters,
  setPage,
  selects
}: Props<TData>) {

  const hasFilters = Object.values(filters).some(v => v !== "")
  return (
    <div className="flex flex-wrap items-center gap-3">

      {selects.map(select => (
        <select
          key={select.filterKey}
          className={selectBase}
          value={filters[select.filterKey] ?? ""}
          onChange={(e) => {
            setPage(1)

            setFilters(prev => ({
              ...prev,
              [select.filterKey]: e.target.value,
            }))
          }}
        >
          <option value="">
            Tous {select.label}
          </option>

          {select.options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ))}

      {/* RESET BUTTON */}
      <button
        onClick={() => {
          setFilters({})
          setPage(1)
        }}
        disabled={!hasFilters}
        className={[
          "px-3 py-2 rounded-xl text-sm transition border",
          hasFilters
            ? "bg-indigo-600 text-white border-indigo-600 hover:opacity-90"
            : "bg-white/40 text-slate-400 border-slate-200 cursor-not-allowed"
        ].join(" ")}
      >
        Reset filtres
      </button>

    </div>
  )
}