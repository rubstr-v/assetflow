import { useState } from "react"
import { Building2, Mail, ArrowRight, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { loginEmail } from "../auth/auth.api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const ok = await loginEmail(email)

    if (ok) {
      toast.success("Magic link envoyé")
    } else {
      toast.error("Impossible d'envoyer le lien")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white p-10">

          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Building2 size={26} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  AssetFlow
                </h1>

                <p className="text-white/70 text-sm">
                  Site Management Platform
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">

            <div className="flex gap-3">
              <ShieldCheck className="mt-1 shrink-0" size={20} />
              <div>
                <div className="font-medium">
                  Secure authentication
                </div>
                <div className="text-sm text-white/70">
                  Passwordless login with email or Microsoft SSO.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck className="mt-1 shrink-0" size={20} />
              <div>
                <div className="font-medium">
                  Centralized supervision
                </div>
                <div className="text-sm text-white/70">
                  Monitor all your sites, documents and criticality.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck className="mt-1 shrink-0" size={20} />
              <div>
                <div className="font-medium">
                  Collaborative
                </div>
                <div className="text-sm text-white/70">
                  Manage sites with your whole security team.
                </div>
              </div>
            </div>

          </div>

          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} AssetFlow
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-md">

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back
              </h2>

              <p className="text-slate-500 mt-2">
                Sign in to access your dashboard.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@company.com"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />

                </div>

              </div>

              <button
                disabled={loading}
                className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send magic link
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

            </form>

            <div className="relative my-7">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-slate-400 uppercase">
                  or
                </span>
              </div>

            </div>

            <a
              href="http://localhost/auth/microsoft"
              className="flex items-center justify-center h-12 rounded-xl border border-slate-300 hover:bg-slate-50 transition font-medium text-slate-700"
            >
              Continue with Microsoft
            </a>

          </div>

        </div>

      </div>

    </div>
  )
}