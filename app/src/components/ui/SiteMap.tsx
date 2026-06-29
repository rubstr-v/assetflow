import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { useEffect, useState, } from "react"
import { useMap } from "react-leaflet"
import { modernMarkerIcon } from "../createIcon"

type Props = {
    latitude: number
    longitude: number
    editable: boolean
    onChange?: (lat: number, lng: number) => void
}

function ScrollZoomHandler({ enabled }: { enabled: boolean }) {
    const map = useMap()

    useEffect(() => {
        if (enabled) map.scrollWheelZoom.enable()
        else map.scrollWheelZoom.disable()
    }, [enabled, map])

    return null
}

function MapClickHandler({
    onChange,
    editable,
}: {
    onChange?: (lat: number, lng: number) => void
    editable: boolean
}) {
    useMapEvents(
        editable
            ? {
                click(e) {
                    onChange?.(e.latlng.lat, e.latlng.lng)
                },
            }
            : {}
    )

    return null
}

export function SiteMap({
    latitude,
    longitude,
    editable,
    onChange,
}: Props) {
    const [hovered, setHovered] = useState(false)

    const position: [number, number] = [latitude, longitude]

    return (
        <div
            className="h-[300px] w-full rounded-xl overflow-hidden border border-slate-200"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <MapContainer
                center={position}
                zoom={13}
                className="h-full w-full"
                scrollWheelZoom={false}
            >
                <ScrollZoomHandler enabled={hovered && editable} />

                <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[latitude, longitude]}
                    icon={modernMarkerIcon}
                    draggable={editable}
                    eventHandlers={{
                        dragend(e) {
                            const marker = e.target
                            const { lat, lng } = marker.getLatLng()
                            onChange?.(lat, lng)
                        },
                    }}
                />

                {/* clic pour déplacer */}
                {editable && (
                    <MapClickHandler editable={editable} onChange={onChange} />
                )}
            </MapContainer>
        </div>
    )
}