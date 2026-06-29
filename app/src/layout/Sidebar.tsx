import { useState } from "react"
import {
    LayoutDashboard,
    Folder,
    Plug,
    Settings,
    Menu
} from "lucide-react"
import { NavLink } from "react-router-dom"

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)

    const items = [
        { label: "Dashboard", icon: LayoutDashboard, to: "/" },
        { label: "Sites", icon: Folder, to: "/sites" },
        { label: "API", icon: Plug, to: "/api" },
        { label: "Settings", icon: Settings, to: "/settings" },
    ]

    return (
        <aside
            className={[
                "h-screen bg-gradient-to-b from-indigo-600 to-purple-600 text-white flex flex-col transition-all shadow-xl",
                collapsed ? "w-20" : "w-64"
            ].join(" ")}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                {!collapsed && (
                    <div className="font-bold text-lg">Assetflow</div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-white/10 rounded"
                >
                    <Menu size={18} />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 mt-4 space-y-1">
                {items.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition",
                                    isActive
                                        ? "bg-white/20"
                                        : "hover:bg-white/15"
                                ].join(" ")
                            }
                        >
                            <Icon size={20} />

                            {!collapsed && (
                                <span className="text-sm font-medium">
                                    {item.label}
                                </span>
                            )}
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    )
}