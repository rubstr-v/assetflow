export async function getSites(
    page: number,
    pageSize: number,
    filters: Record<string, string>
) {
    const params = new URLSearchParams()

    params.set("page", String(page))
    params.set("itemsPerPage", String(pageSize))

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.set(key, value)
        }
    })

    const response = await fetch(
        `http://localhost/api/sites?${params}`
    )

    const data = await response.json()

    return {
        sites: data.member,
        totalItems: data.totalItems,
    }
}