export type FileType = "image" | "pdf" | "video" | "archive" | "other"

export type SiteFile = {
  id: string
  name: string
  url: string
  type: FileType
  size: number
  createdAt: string
}