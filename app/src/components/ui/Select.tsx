type Option = {
    value: string
    label: string
    color?: string
}

type Props = {
    value?: string
    editable?: boolean
    options: Option[]
    onChange?: (value: string) => void
    placeholder?: string
}

function getContrastColor(hex?: string) {
    if (!hex) return "#334155"

    const clean = hex.replace("#", "")
    if (clean.length !== 6) return "#334155"

    const r = parseInt(clean.slice(0, 2), 16)
    const g = parseInt(clean.slice(2, 4), 16)
    const b = parseInt(clean.slice(4, 6), 16)

    // luminance simple
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 180 ? "#0f172a" : "#ffffff"
}

export function Select({
    value,
    editable,
    options,
    onChange,
    placeholder = "—",
}: Props) {
    const selected = options.find(o => o.value === value)

    const bgColor = selected?.color ? `${selected.color}18` : "#f8fafc"
    const borderColor = selected?.color ? `${selected.color}35` : "#e2e8f0"
    const textColor = getContrastColor(selected?.color)

    if (!editable) {
        return (
            <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all"
                style={{
                    backgroundColor: bgColor,
                    color: selected?.color ?? "#475569",
                    borderColor,
                }}
            >
                <span
                    className="w-1.5 h-1.5 rounded-full mr-2"
                    style={{ backgroundColor: selected?.color ?? "#94a3b8" }}
                />
                {selected?.label ?? placeholder}
            </span>
        )
    }

    return (
        <div className="relative">
            <select
                className="w-full appearance-none px-3 py-2 pr-8 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▾
            </div>
        </div>
    )
}