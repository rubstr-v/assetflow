import { ChevronDown, Bell, Search, LogOut, Settings, User } from "lucide-react"
import { useAuth } from "../auth/AuthProvider"
import { useLocation, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"

export default function Navbar() {
    const location = useLocation()
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const map: Record<string, { title: string; crumb: string }> = {
        "/": { title: "Dashboard", crumb: "Overview" },
        "/sites": { title: "Sites", crumb: "List" },
    }
    const { logout } = useAuth()
    const navigate = useNavigate()
    const current = map[location.pathname] ?? { title: "", crumb: "" }
    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200">
            {/* Left */}
            <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-slate-800">
                    {current.title}
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
                    <span>/</span>
                    <span className="text-slate-600">{current.crumb}</span>
                </div>
            </div>

            {/* Center search */}
            <div className="hidden lg:flex items-center gap-2 w-[360px] px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
                <Search size={16} className="text-slate-400" />
                <input
                    placeholder="Rechercher..."
                    className="bg-transparent outline-none text-sm placeholder:text-slate-400 w-full"
                />
            </div>

            {/* Right */}
            {/* Right */}
            <div className="flex items-center gap-3">

                <button className="relative p-2 rounded-full hover:bg-slate-100 border border-slate-200 transition">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full" />
                </button>

                <div
                    ref={menuRef}
                    className="relative border-l border-slate-200 pl-3"
                >
                    <button
                        onClick={() => setOpen(v => !v)}
                        className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-slate-100 transition"
                    >
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium text-slate-900">
                                {user?.fullName}
                            </div>

                            <div className="text-xs text-slate-500">
                                {user?.roles?.includes("ROLE_ADMIN")
                                    ? "Administrateur"
                                    : "Utilisateur"}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                {user?.firstname?.[0]}
                                {user?.lastname?.[0]}
                            </div>

                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                        </div>

                        <ChevronDown
                            size={16}
                            className={`transition ${open ? "rotate-180" : ""}`}
                        />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50">

                            <div className="px-4 py-4 border-b bg-slate-50">
                                <div className="font-medium">
                                    {user?.fullName}
                                </div>

                                <div className="text-sm text-slate-500 mt-1">
                                    {user?.email}
                                </div>
                            </div>

                            <button
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-sm transition"
                            >
                                <User size={17} />
                                Mon profil
                            </button>

                            <button
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-sm transition"
                            >
                                <Settings size={17} />
                                Paramètres
                            </button>

                            <div className="border-t" />

                            <button
                                onClick={async () => {
                                    await logout()
                                    navigate("/login")
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition text-sm"
                            >
                                <LogOut size={17} />
                                Déconnexion
                            </button>

                        </div>
                    )}
                </div>

            </div>
        </header>
    )
}