import L from "leaflet"

export const modernMarkerIcon = L.divIcon({
  className: "",
  html: `
    <div class="relative">
      <div class="w-3 h-3 bg-indigo-600 rounded-full shadow-md"></div>
      <div class="absolute -inset-2 bg-indigo-500/30 rounded-full blur-md"></div>
    </div>
  `,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})