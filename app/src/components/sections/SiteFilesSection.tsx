import { useMemo } from "react"
import { FilesTable } from "../files/FilesTable"
import { FileUploadZone } from "../files/FileUploadZone"
import { useFilesTable } from "../../hooks/useFilesTable"
import { formatFileSize } from "../../utils/formatFileSize"
import { formatDate } from "../../utils/formatDate"
import { toast } from "sonner"


export function SiteFilesSection({ files, setFiles, site, onUpload, isEditing }) {
  const columns = useMemo(() => [
    {
      accessorKey: "name",
      header: "Nom",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ getValue }) => {
        const type = getValue() as string

        const color =
          type === "image"
            ? "bg-emerald-100 text-emerald-700"
            : type === "pdf"
              ? "bg-red-100 text-red-700"
              : "bg-slate-100 text-slate-700"

        return (
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
            {type}
          </span>
        )
      },
    },
    {
      accessorKey: "size",
      header: "Taille",
      cell: ({ getValue }) => (
        <span className="text-slate-600 text-sm">
          {formatFileSize(getValue() as number)}
        </span>
      ),
    },
    {
      accessorKey: "addedDate",
      header: "Ajouté le",
      cell: ({ getValue }) => {
        return (
          <span className="text-slate-500 text-sm">
            {formatDate(getValue() as string)}
          </span>
        )
      },
    },
  ], [])

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

  const { table } = useFilesTable(files, [
    ...columns,
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
  ])
console.log("isEditing:", isEditing)
  return (
    <div className="space-y-4">
      {isEditing && (
        <div className="p-4 border rounded-xl bg-slate-50">
          <FileUploadZone onUpload={onUpload} />
        </div>
      )}

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <FilesTable table={table} />
      </div>
    </div>
  )
}