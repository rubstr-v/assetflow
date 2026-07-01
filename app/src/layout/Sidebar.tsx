import { useState } from "react"
import {
    LayoutDashboard,
    Folder,
    Settings,
    Menu,
    Building2,
    Shield,
    ChevronDown,
    Users
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const { user } = useAuth()

    const isAdmin = user?.roles?.includes("ROLE_ADMIN")

    const items = [
        { label: "Dashboard", icon: LayoutDashboard, to: "/" },
        { label: "Sites", icon: Folder, to: "/sites" },
    ]

    const adminItems = [
        { label: "Users", icon: Users, to: "/admin/users" },
        { label: "Site Types", icon: Shield, to: "/admin/site-types" },
        { label: "Site Criticities", icon: Shield, to: "/admin/site-criticities" },
        { label: "Site Categories", icon: Shield, to: "/admin/site-categories" },
    ]

    return (
        <aside
            className={[
                "h-screen flex flex-col text-white shadow-2xl transition-all duration-300",
                "bg-gradient-to-b from-indigo-600 via-indigo-600 to-purple-700",
                collapsed ? "w-20" : "w-64"
            ].join(" ")}
        >

            {/* HEADER */}
            <div
                className={[
                    "border-b border-white/10 p-4 flex items-center",
                    collapsed ? "justify-center" : "justify-between"
                ].join(" ")}
            >
                {/* Brand (uniquement expanded) */}
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Building2 size={20} />
                        </div>

                        <div className="leading-tight">
                            <div className="font-bold text-base">AssetFlow</div>
                            <div className="text-xs text-white/60">
                                Site Management
                            </div>
                        </div>
                    </div>
                )}

                {/* Toggle (toujours visible) */}
                <button
                    onClick={() => setCollapsed(v => !v)}
                    className={[
                        "p-2 rounded-lg hover:bg-white/10 transition",
                        collapsed ? "mx-auto" : ""
                    ].join(" ")}
                >
                    <Menu
                        size={18}
                        className={[
                            "transition-transform duration-300",
                            collapsed ? "rotate-180" : ""
                        ].join(" ")}
                    />
                </button>
            </div>

            <nav className="flex-1 mt-4 space-y-1 px-2">
                {items.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    "relative flex items-center rounded-lg transition",
                                    isActive
                                        ? "bg-white/15 shadow-sm"
                                        : "hover:bg-white/10",

                                    collapsed
                                        ? "justify-center py-3"
                                        : "gap-3 px-3 py-3"
                                ].join(" ")
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-full" />
                                    )}

                                    <Icon size={18} />

                                    {!collapsed && (
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    )
                })}
                {/* ADMIN SECTION */}
                {isAdmin && (
                    <div className="mt-6 px-2">

                        {/* SECTION LABEL */}
                        {!collapsed && (
                            <div className="px-3 mb-2 text-[11px] tracking-widest text-white/50 uppercase">
                                Administration
                            </div>
                        )}

                        {/* ITEMS */}
                        <div className="space-y-1">
                            {adminItems.map((item) => {
                                const Icon = item.icon

                                return (
                                    <NavLink
                                        key={item.label}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            [
                                                "flex items-center rounded-lg transition",
                                                isActive
                                                    ? "bg-white/15"
                                                    : "hover:bg-white/10",
                                                collapsed
                                                    ? "justify-center py-3"
                                                    : "gap-3 px-3 py-2"
                                            ].join(" ")
                                        }
                                    >
                                        <Icon size={18} />
                                        {!collapsed && (
                                            <span className="text-sm">
                                                {item.label}
                                            </span>
                                        )}
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                )}
            </nav>
        </aside>
    )
}