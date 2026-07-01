import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

export default function AppLayout() {
  return (
    <div className="h-screen flex bg-slate-50 text-slate-900 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}