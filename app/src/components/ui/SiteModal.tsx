import { useState } from "react"
import { toast } from "sonner"
import { SiteMap } from "./SiteMap"

type Props = {
    site: any
    onClose: () => void
}

function Section({ title, children }: any) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold text-slate-800">
                    {title}
                </h2>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-slate-50/40 p-4 space-y-3">
                {children}
            </div>
        </div>
    )
}

function Input({ value, editable }: any) {
    if (!editable) {
        return (
            <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100
                      text-sm text-slate-800 font-medium">
                {value ?? "—"}
            </div>
        )
    }

    return (
        <input
            value={value ?? ""}
            readOnly
            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm
                 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
    )
}

function Field({ label, children }: any) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {label}
            </label>

            <div>
                {children}
            </div>
        </div>
    )
}

function Grid({ cols = 2, children }: any) {
    const colsClass =
        cols === 2
            ? "grid grid-cols-2 gap-4"
            : cols === 3
                ? "grid grid-cols-3 gap-4"
                : "grid grid-cols-1 gap-4"

    return <div className={colsClass}>{children}</div>
}

function Select({ value, editable }: any) {
    const baseChip =
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"

    const color =
        value === "active"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
            : value === "paused"
                ? "bg-amber-50 text-amber-700 border border-amber-100"
                : "bg-slate-50 text-slate-600 border border-slate-100"

    if (!editable) {
        return <span className={`${baseChip} ${color}`}>{value}</span>
    }

    return (
        <select
            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm
                 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            defaultValue={value}
        >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
        </select>
    )
}

export function SiteModal({ site, onClose }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [coords, setCoords] = useState({
        lat: site.latitude,
        lng: site.longitude,
    })
    if (!site) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose()
                }
            }}>

            <div className="w-[1100px] max-w-[95vw] h-[90vh] overflow-hidden bg-white rounded-2xl shadow-xl flex flex-col">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white">

                    <div>
                        <h2 className="text-lg font-semibold">{site.name}</h2>
                        <p className="text-xs text-white/70">{site.url}</p>
                    </div>

                    <div className="flex items-center gap-2">

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        // fake save
                                        console.log("save")
                                        if (confirm("Save this site ?")) {
                                            toast.success("Site mis à jour")
                                            onClose()
                                        }
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-sm"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => {
                                        // fake delete
                                        console.log("delete")
                                        if (confirm("Delete this site ?")) {
                                            toast.success("Site supprimé")
                                            onClose()
                                        }
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-sm text-white"
                                >
                                    Delete
                                </button>
                            </>
                        )}

                        <button
                            onClick={onClose}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
                        >
                            ✕
                        </button>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* SECTION 1 */}
                    <Section title="Informations générales">
                        <Grid cols={3}>
                            <Field label="Nom">
                                <Input value={site.name} editable={isEditing} />
                            </Field>

                            <Field label="URL">
                                <Input value={site.url} editable={isEditing} />
                            </Field>

                            <Field label="Status">
                                <Select value={site.status} editable={isEditing} />
                            </Field>
                        </Grid>
                    </Section>
                    {/* SECTION 2 */}
                    <Section title="Géolocalisation">
                        <Grid cols={1}>
                            <Field label="Adresse">
                                <Input value={site.address} editable={isEditing} />
                            </Field>
                        </Grid>

                        <Grid cols={2}>
                            <Field label="Latitude">
                                <Input value={coords.lat} editable={isEditing} />
                            </Field>

                            <Field label="Longitude">
                                <Input value={coords.lng} editable={isEditing} />
                            </Field>
                        </Grid>
                    </Section>

                    {/* SECTION 3 */}
                    <Section title="Carte">
                        <div className="pt-2">
                            <SiteMap
                                latitude={coords.lat}
                                longitude={coords.lng}
                                editable={isEditing}
                                onChange={(lat, lng) => setCoords({ lat, lng })}
                            />
                        </div>
                    </Section>

                </div>

                {/* FOOTER */}
                {isEditing && (
                    <div className="sticky bottom-0 border-t border-slate-200/60 bg-white/80 backdrop-blur px-6 py-4 flex items-center justify-between">

                        {/* Left side (optionnel) */}
                        <div className="text-xs text-slate-500">
                            Modifications en cours
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-2">

                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-2 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => console.log("save")}
                                className="px-3 py-2 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
                            >
                                Save changes
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}