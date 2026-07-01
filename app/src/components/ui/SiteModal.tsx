import { useEffect, useState } from "react"
import { toast } from "sonner"
import { SiteFilesSection } from "../sections/SiteFilesSection"
import { SiteMap } from "./SiteMap"
import { Select } from "./Select"

type Props = {
    site: any
    onClose: () => void
    onSaved?: () => void
    siteTypes: any[]
    siteCriticities: any[]
    siteCategories: any[]
    entities: any[]
}
function ImageCarousel({ images }: { images: any[] }) {
    const [index, setIndex] = useState(0)

    if (!images.length) {
        return (
            <div className="h-75 flex items-center justify-center text-slate-400 border rounded-xl">
                Aucune image
            </div>
        )
    }

    const current = images[index]

    return (
        <div className="relative w-full h-75 rounded-xl overflow-hidden border bg-black">
            <img
                src={`http://localhost${current.path}`}
                className="w-full h-full object-cover"
            />

            {/* controls */}
            <button
                onClick={() => setIndex(i => (i === 0 ? images.length - 1 : i - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
            >
                ‹
            </button>

            <button
                onClick={() => setIndex(i => (i === images.length - 1 ? 0 : i + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
            >
                ›
            </button>

            {/* counter */}
            <div className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                {index + 1} / {images.length}
            </div>
        </div>
    )
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

function Input({ value, editable, onChange }: any) {
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
            onChange={(e) => onChange?.(e.target.value)}
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


type GridProps = {
    cols: number
    children: React.ReactNode
}

export function Grid({ cols, children }: GridProps) {
    return (
        <div
            className="grid gap-4"
            style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
        >
            {children}
        </div>
    )
}

function getFileType(filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase()

    if (!ext) return "file"

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
        return "image"
    }

    if (["pdf"].includes(ext)) {
        return "pdf"
    }

    if (["doc", "docx"].includes(ext)) {
        return "doc"
    }

    if (["xls", "xlsx"].includes(ext)) {
        return "excel"
    }

    if (["zip", "rar", "7z"].includes(ext)) {
        return "archive"
    }

    return "file"
}

type DocumentFile = {
    id: number | string
    name: string
    size: string | number
    type?: string
    addedDate?: string
    file?: string
}


export function SiteModal({
    site,
    onClose,
    onSaved,
    siteTypes,
    siteCriticities,
    siteCategories,
    entities
}: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [files, setFiles] = useState<DocumentFile[]>([])
    const [draft, setDraft] = useState(site)

    const [coords, setCoords] = useState({
        lat: draft.latitude,
        lng: draft.longitude,
    })

    useEffect(() => {
        setDraft(site)
    }, [site])

    if (!site) return null

    async function handleSave() {
        const payload = {
            name: draft.name,
            supplier: draft.supplier,
            address: draft.address,
            numberEmployees: draft.numberEmployees,
            contractExpirationDate: draft.contractExpirationDate,
            exitConditions: draft.exitConditions,
            nbEtpSite: draft.nbEtpSite,
            comments: draft.comments,
            recommendations: draft.recommendations,

            entity: draft.entity?.id ? `/api/entities/${draft.entity.id}` : null,
            siteType: draft.siteType?.id ? `/api/site_types/${draft.siteType.id}` : null,
            siteCategory: draft.siteCategory?.id ? `/api/site_categories/${draft.siteCategory.id}` : null,
            siteCriticity: draft.siteCriticity?.id ? `/api/site_criticities/${draft.siteCriticity.id}` : null,
        }

        const res = await fetch(`http://localhost/api/sites/${site.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json",
                "Accept": "application/ld+json",
            },
            body: JSON.stringify(payload),
        })

        if (!res.ok) {
            console.error(await res.text())
            toast.error("Erreur API")
            return
        }

        toast.success("Site mis à jour")
        setIsEditing(false)
        onSaved?.()
    }

    useEffect(() => {
        if (!site?.id) return

        fetch(`http://localhost/api/documents?site.id=${site.id}`)
            .then(r => r.json())
            .then(data => {
                console.log("Fetched files:", data)
                setFiles(data.member ?? [])
            })
    }, [site?.id])


    async function handleUpload(rawFiles: File[]) {
        const uploaded = await Promise.all(
            rawFiles.map(async (file) => {
                const formData = new FormData()

                formData.append("file", file)
                formData.append("name", file.name)
                formData.append("size", String(file.size))
                formData.append("type", getFileType(file.name))
                formData.append("addedDate", new Date().toISOString())
                formData.append("site", `/api/sites/${site.id}`)

                const res = await fetch("http://localhost/api/documents/upload", {
                    method: "POST",
                    body: formData, // ❗ pas de headers ici
                })

                if (!res.ok) {
                    throw new Error(await res.text())
                }

                return res.json()
            })
        )

        setFiles(prev => [...prev, ...uploaded])
    }
    console.log("isEditing:", isEditing)
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-500 p-6"
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
                                    onClick={handleSave}
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
                    <Section title="Informations générales">
                        <Grid cols={3}>
                            <Field label="Site">
                                <Input value={draft.name} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, name: val }))
                                } />
                            </Field>

                            <Field label="Société">
                                <Select
                                    value={draft.entity?.id ? String(draft.entity.id) : ""}
                                    editable={isEditing}
                                    options={(entities ?? []).map(t => ({
                                        value: String(t.id),
                                        label: t.name,
                                        color: t.color,
                                    }))}
                                    onChange={(val) => {
                                        const selected = entities.find(t => String(t.id) === val)

                                        setDraft(prev => ({
                                            ...prev,
                                            entity: selected ?? null,
                                        }))
                                    }}
                                />
                            </Field>

                            <Field label="Type de site">
                                <Select
                                    value={draft.siteType?.id ? String(draft.siteType.id) : ""}
                                    editable={isEditing}
                                    options={(siteTypes ?? []).map(t => ({
                                        value: String(t.id),
                                        label: t.name,
                                        color: t.color,
                                    }))}
                                    onChange={(val) => {
                                        const selected = siteTypes.find(t => String(t.id) === val)

                                        setDraft(prev => ({
                                            ...prev,
                                            siteType: selected ?? null,
                                        }))
                                    }}
                                />
                            </Field>

                            <Field label="Criticité">
                                <Select
                                    value={draft.siteCriticity?.id ? String(draft.siteCriticity.id) : ""}
                                    editable={isEditing}
                                    options={(siteCriticities ?? []).map(t => ({
                                        value: String(t.id),
                                        label: t.name,
                                        color: t.color,
                                    }))}
                                    onChange={(val) => {
                                        const selected = siteCriticities.find(t => String(t.id) === val)

                                        setDraft(prev => ({
                                            ...prev,
                                            siteCriticity: selected ?? null,
                                        }))
                                    }}
                                />
                            </Field>
                        </Grid>
                    </Section>
                    {/* SECTION 1 */}
                    <Section title="Responsables">
                        <Grid cols={3}>
                            <Field label="Moyens généraux">
                                <Input value={draft.siteManager?.fullName} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, siteManager: { ...prev.siteManager, fullName: val } }))
                                } />
                            </Field>

                            <Field label="Sûreté">
                                <Input value={draft.safetyManager?.fullName} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, safetyManager: { ...prev.safetyManager, fullName: val } }))
                                } />
                            </Field>

                            <Field label="Sécurité">
                                <Input value={draft.securityManager?.fullName} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, securityManager: { ...prev.securityManager, fullName: val } }))
                                } />
                            </Field>
                        </Grid>
                    </Section>

                    <Section title="Contrat & données">
                        <Grid cols={3}>
                            <Field label="Fournisseur">
                                <Input value={draft.supplier} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, supplier: val }))
                                } />
                            </Field>

                            <Field label="Fin de contrat">
                                <Input value={draft.contractExpirationDate} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, contractExpirationDate: val }))
                                } />
                            </Field>

                            <Field label="Modalité de sortie">
                                <Input value={draft.exitConditions} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, exitConditions: val }))
                                } />
                            </Field>

                            <Field label="ETP / site">
                                <Input value={draft.nbEtpSite} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, nbEtpSite: val }))
                                } />
                            </Field>

                            <Field label="Nombre d'employés">
                                <Input value={draft.numberEmployees} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, numberEmployees: val }))
                                } />
                            </Field>

                            <Field label="Catégorie">
                                <Select
                                    value={draft.siteCategory?.id ? String(draft.siteCategory.id) : ""}
                                    editable={isEditing}
                                    options={(siteCategories ?? []).map(c => ({
                                        value: String(c.id),
                                        label: c.name,
                                        color: c.color,
                                    }))}
                                    onChange={(val) => {
                                        const selected = siteCategories.find(c => String(c.id) === val)

                                        setDraft(prev => ({
                                            ...prev,
                                            siteCategory: selected ?? null,
                                        }))
                                    }}
                                />
                            </Field>
                        </Grid>
                    </Section>
                    {/* SECTION 2 */}
                    <Section title="Géolocalisation">
                        <Grid cols={1}>
                            <Field label="Adresse">
                                <Input value={draft.address} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, address: val }))
                                } />
                            </Field>
                        </Grid>

                        <Grid cols={2}>
                            <Field label="Latitude">
                                <Input value={coords.lat} editable={isEditing} onChange={(val) =>
                                    setCoords(prev => ({ ...prev, lat: val }))
                                } />
                            </Field>

                            <Field label="Longitude">
                                <Input value={coords.lng} editable={isEditing} onChange={(val) =>
                                    setCoords(prev => ({ ...prev, lng: val }))
                                } />
                            </Field>
                        </Grid>
                    </Section>

                    {/* SECTION 3 */}
                    <Section title="Carte & médias">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <SiteMap
                                    latitude={coords.lat}
                                    longitude={coords.lng}
                                    editable={isEditing}
                                    onChange={(lat, lng) => setCoords({ lat, lng })}
                                />
                            </div>
                            <div>
                                <ImageCarousel
                                    images={files.filter(f => f.type === "image")}
                                />
                            </div>
                        </div>
                    </Section>

                    {/* SECTION 4 */}
                    <Section title="Description">
                        <Grid cols={1}>
                            <Field label="Recommendations">
                                <Input value={draft.recommendations} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, recommendations: val }))
                                } />
                            </Field>
                            <Field label="Commentaires">
                                <Input value={draft.comments} editable={isEditing} onChange={(val) =>
                                    setDraft(prev => ({ ...prev, comments: val }))
                                } />
                            </Field>
                        </Grid>
                    </Section>

                    <Section title="Fichiers">
                        <SiteFilesSection
                            files={files}
                            setFiles={setFiles}
                            site={site}
                            onUpload={handleUpload}
                            isEditing={isEditing}
                        />
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
                                onClick={() => handleSave()}
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