export async function getDashboard() {
    const response = await fetch("http://localhost:80/api/dashboard")

    if (!response.ok) {
        throw new Error("Dashboard error")
    }
    return response.json()
}