import { createContext, useContext, useEffect, useState } from "react"
import { fetchMe, logout as logoutApi } from "./auth.api"

type AuthContextType = {
    user: any
    loading: boolean
    refresh: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    async function refresh() {
        const me = await fetchMe()
        setUser(me)
        setLoading(false)
    }

    useEffect(() => {
        refresh()
    }, [])

    async function logout() {
        await logoutApi()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, refresh, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
    return ctx
}