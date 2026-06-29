import type { FileType } from "../types/file"

export function getFileType(filename: string): FileType {
  const ext = filename.split(".").pop()?.toLowerCase()

  if (!ext) return "other"

  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "image"
  if (["pdf"].includes(ext)) return "pdf"
  if (["mp4", "mov", "webm"].includes(ext)) return "video"
  if (["zip", "rar", "7z"].includes(ext)) return "archive"

  return "other"
}