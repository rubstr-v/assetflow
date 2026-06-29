import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { modernMarkerIcon } from "../createIcon"

type Site = {
  id: number
  name: string
  latitude: number
  longitude: number
  status: "active" | "paused"
}

type Props = {
  sites: Site[]
  onSelectSite?: (site: Site) => void
}

export function SitesMapDashboard({ sites, onSelectSite }: Props) {
  const center: [number, number] = [48.8566, 2.3522]

  return (
    <div className="h-[420px] w-full rounded-xl overflow-hidden border shadow-sm">
      <MapContainer
        center={center}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.latitude, site.longitude]}
            icon={modernMarkerIcon}
            eventHandlers={{
              click: () => onSelectSite?.(site),
            }}
          >
            <Popup>
              <div className="space-y-1">
                <div className="font-medium">{site.name}</div>
                <div className="text-xs text-gray-500">{site.status}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}