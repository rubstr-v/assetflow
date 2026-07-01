import { useEffect, useState } from "react"
import { SitesMapDashboard } from "../components/ui/SitesMapDashboard"
import { SiteModal } from "../components/ui/SiteModal"
import { getDashboard } from "../api/dashboard"

type StatCardProps = {
  title: string
  value: string | number
  subtitle?: string
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="text-sm text-slate-500">
        {title}
      </div>

      <div className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </div>

      {subtitle && (
        <div className="mt-1 text-xs text-slate-400">
          {subtitle}
        </div>
      )}
    </div>
  )
}

type Site = {
  id: number
  name: string
  latitude: number
  longitude: number
  status: "active" | "paused"
}

type Dashboard = {
  sitesCount: number
  employeesCount: number
  documentsCount: number
  contactsCount: number
  expiringContractsCount: number
  expiredContractsCount: number
  sites: Site[]
}

export default function Dashboard() {
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)

  useEffect(() => {
    getDashboard().then(setDashboard)
  }, [])

  const sites = dashboard?.sites ?? []

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Dashboard
      </h1>

      {/* cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Sites total"
          value={dashboard?.sitesCount ?? 0}
        />

        <StatCard
          title="Effectif total"
          value={dashboard?.employeesCount ?? 0}
        />

        <StatCard
          title="À renouveler (3 mois)"
          value={dashboard?.expiringContractsCount ?? 0}
        />

        <StatCard
          title="Contrats expirés"
          value={dashboard?.expiredContractsCount ?? 0}
        />

      </div>

      {/* MAP GLOBAL */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Sites overview</h2>

        <SitesMapDashboard
          sites={sites}
          onSelectSite={setSelectedSite}
        />
      </div>

      {/* MODAL */}
      {selectedSite && (
        <SiteModal
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
        />
      )}
    </div>
  )
}