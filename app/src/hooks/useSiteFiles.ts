import { useState } from "react"
import type { SiteFile } from "../types/file"

export function useSiteFiles(initial: SiteFile[] = []) {
  const [files, setFiles] = useState(initial)

  function addFiles(newFiles: SiteFile[]) {
    setFiles((prev) => [...prev, ...newFiles])
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter(f => f.id !== id))
  }

  return {
    files,
    addFiles,
    removeFile,
  }
}