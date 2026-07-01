export function formatDate(date?: string | null): string {
  if (!date) return "-"

  const d = new Date(date)

  if (isNaN(d.getTime())) return "-"

  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d)
}