import { FileUploadZone } from "../files/FileUploadZone"
import { useFilesTable } from "../../hooks/useFilesTable"
import { toast } from "sonner"
import { documentColumns } from "../tables/columns/documents.columns"
import { DataTable } from "../tables/DataTable"
import { useDataTable } from "../../hooks/useDataTable"
import type { SortingState } from "@tanstack/react-table"
import { useState } from "react"


export function SiteFilesSection({ files, setFiles, site, onUpload, isEditing }) {
  const [sorting, setSorting] = useState<SortingState>([])

  async function handleDownload(file) {
    const res = await fetch(`http://localhost/api/documents/${file.id}/download`)

    if (!res.ok) {
      toast.error("Download failed")
      return
    }

    const blob = await res.blob()

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")

    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    a.remove()

    window.URL.revokeObjectURL(url)
  }

  async function handleDelete(id: number) {
    const res = await fetch(`http://localhost/api/documents/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      toast.error("Delete failed")
      return
    }

    setFiles(prev => prev.filter(f => f.id !== id))
    toast.success("Deleted")
  }

  const table = useDataTable({
    data: files,
    columns: [
      ...documentColumns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const file = row.original

          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload(file)}
                className="px-2 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Download
              </button>

              {isEditing && (
                <button
                  onClick={() => handleDelete(file.id)}
                  className="px-2 py-1 text-xs rounded-md bg-red-50 hover:bg-red-100 text-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          )
        },
      },
    ],
    sorting,
    onSortingChange: setSorting,
  })


  return (
    <div className="space-y-4">
      {isEditing && (
        <div className="p-4 border rounded-xl bg-slate-50">
          <FileUploadZone onUpload={onUpload} />
        </div>
      )}

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <DataTable table={table} />
      </div>
    </div>
  )
}