import { useState } from "react"
import { SitesMapDashboard } from "../components/ui/SitesMapDashboard"
import { SiteModal } from "../components/ui/SiteModal"

export default function Dashboard() {
  const [selectedSite, setSelectedSite] = useState<any>(null)

  const sites = [
    {
      id: 1,
      name: "Site Alpha",
      latitude: 48.8566,
      longitude: 2.3522,
      status: "active",
    },
    {
      id: 2,
      name: "Site Beta",
      latitude: 48.8666,
      longitude: 2.3322,
      status: "paused",
    },
  ]

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Dashboard
      </h1>

      {/* cards */}
      <div className="grid grid-cols-3 gap-4">
        {["Projets", "API Calls", "Users"].map((t) => (
          <div key={t} className="p-5 rounded-xl bg-white shadow-sm border">
            <div className="text-sm text-gray-500">{t}</div>
            <div className="text-2xl font-bold mt-2">128</div>
          </div>
        ))}
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