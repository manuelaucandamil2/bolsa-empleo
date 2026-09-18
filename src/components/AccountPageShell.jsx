import { useNavigate } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { IconArrowLeft } from './icons'

export default function AccountPageShell({ title, subtitle, action, children }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1654a3] hover:text-[#0ca3c5]"
        >
          <IconArrowLeft className="h-4 w-4" />
          Volver a Vacantes
        </button>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {action}
        </div>

        {children}
      </main>

      <SiteFooter />
    </div>
  )
}
