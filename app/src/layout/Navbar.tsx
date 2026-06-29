import { Bell, Search, Sparkles } from "lucide-react"
import { useLocation } from "react-router-dom"

export default function Navbar() {
    const location = useLocation()
    const map: Record<string, { title: string; crumb: string }> = {
        "/": { title: "Dashboard", crumb: "Overview" },
        "/sites": { title: "Sites", crumb: "List" },
    }
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
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-slate-100 border border-slate-200 transition">
                    <Sparkles size={18} />
                </button>

                <button className="relative p-2 rounded-full hover:bg-slate-100 border border-slate-200 transition">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full" />
                </button>

                {/* User */}
                <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                    <div className="text-right leading-tight hidden sm:block">
                        <div className="text-sm font-medium text-slate-900">
                            John Doe
                        </div>
                        <div className="text-xs text-slate-500">
                            Admin
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                </div>
            </div>
        </header>
    )
}