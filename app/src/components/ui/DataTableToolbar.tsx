import type { Table } from "@tanstack/react-table"

const selectBase =
  "px-3 py-2 rounded-xl bg-white/70 border border-slate-200 text-sm shadow-sm " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"

export function DataTableToolbar<TData>({ table }: { table: Table<TData> }) {
  const hasFilters =
    table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-wrap items-center gap-3">

      <select
        className={selectBase}
        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn("status")?.setFilterValue(e.target.value || undefined)
        }
      >
        <option value="">Tous statuts</option>
        <option value="active">Actif</option>
        <option value="paused">Pause</option>
      </select>

      <select className={selectBase}>
        <option>Type</option>
        <option>Wordpress</option>
        <option>Custom</option>
      </select>

      <select className={selectBase}>
        <option>Owner</option>
        <option>Moi</option>
        <option>Team</option>
      </select>

      <select className={selectBase}>
        <option>Environment</option>
        <option>Prod</option>
        <option>Dev</option>
      </select>

      {/* RESET BUTTON */}
      <button
        onClick={() => table.resetColumnFilters()}
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