export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {["Projets", "API Calls", "Users"].map((t) => (
          <div
            key={t}
            className="p-5 rounded-xl bg-white shadow-sm border hover:shadow-md transition"
          >
            <div className="text-sm text-gray-500">{t}</div>
            <div className="text-2xl font-bold mt-2">128</div>
          </div>
        ))}
      </div>
    </div>
  )
}