import { useMemo } from "react"
import { FilesTable } from "../files/FilesTable"
import { FileUploadZone } from "../files/FileUploadZone"
import { getFileType } from "../../utils/fileType"
import { useFilesTable } from "../../hooks/useFilesTable"
import { formatFileSize } from "../../utils/formatFileSize"
import { formatDate } from "../../utils/formatDate"

export function SiteFilesSection({ files, setFiles }) {

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
            ? "text-emerald-600"
            : type === "pdf"
              ? "text-red-500"
              : "text-slate-600"

        return <span className={color}>{type}</span>
      },
    },
    {
      accessorKey: "size",
      header: "Taille",
      cell: ({ getValue }) => {
        return <span className="text-slate-600">{formatFileSize(getValue() as number)}</span>
      },
    },
    {
      accessorKey: "createdAt",
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

  const { table } = useFilesTable(files, columns)

  function handleUpload(rawFiles: File[]) {
    const mapped = rawFiles.map(f => ({
      id: crypto.randomUUID(),
      name: f.name,
      url: URL.createObjectURL(f),
      type: getFileType(f.name),
      size: f.size,
      createdAt: new Date().toISOString(),
    }))

    setFiles((prev) => [...prev, ...mapped])
  }

  return (
    <div className="space-y-4">
      <FileUploadZone onUpload={handleUpload} />

      <FilesTable table={table} />
    </div>
  )
}