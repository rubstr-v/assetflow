import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import { useEffect, useState, } from "react"
import { useMap } from "react-leaflet"


type Props = {
    latitude: number
    longitude: number
    editable: boolean
    onChange?: (lat: number, lng: number) => void
}

const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})


function ScrollZoomHandler({ enabled }: { enabled: boolean }) {
    const map = useMap()

    useEffect(() => {
        if (enabled) map.scrollWheelZoom.enable()
        else map.scrollWheelZoom.disable()
    }, [enabled, map])

    return null
}

function WheelStopper() {
    const map = useMap()

    useEffect(() => {
        const container = map.getContainer()

        const stop = (e: WheelEvent) => {
            e.stopPropagation()
        }

        container.addEventListener("wheel", stop, { passive: false })

        return () => {
            container.removeEventListener("wheel", stop)
        }
    }, [map])

    return null
}

function DraggableMarker({
    position,
    editable,
    onChange,
}: {
    position: [number, number]
    editable: boolean
    onChange?: (lat: number, lng: number) => void
}) {
    const [pos, setPos] = useState(position)

    useEffect(() => {
        setPos(position)
    }, [position])

    useMapEvents(
        editable
            ? {
                click(e) {
                    const { lat, lng } = e.latlng
                    setPos([lat, lng])
                    onChange?.(lat, lng)
                },
            }
            : {}
    )

    return (
        <Marker
            position={pos}
            icon={icon}
            draggable={editable}
            eventHandlers={{
                dragend(e) {
                    const marker = e.target
                    const latlng = marker.getLatLng()

                    setPos([latlng.lat, latlng.lng])
                    onChange?.(latlng.lat, latlng.lng)
                },
            }}
        />
    )
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
                    icon={icon}
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