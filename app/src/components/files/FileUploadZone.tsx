export function FileUploadZone({
  onUpload,
}: {
  onUpload: (files: File[]) => void
}) {
  return (
    <div
      className="border-2 border-dashed rounded-xl p-6 text-center bg-slate-50"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files || [])
        onUpload(files)
      }}
    >
      <input
        type="file"
        multiple
        className="hidden"
        id="file-upload"
        onChange={(e) => {
          const files = Array.from(e.target.files || [])
          onUpload(files)
        }}
      />

      <label htmlFor="file-upload" className="cursor-pointer text-sm text-slate-600">
        Drag & drop ou clic pour uploader
      </label>
    </div>
  )
}