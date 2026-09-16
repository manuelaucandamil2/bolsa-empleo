import logo from '../assets/logo-preventiva.png'
import { IconHeadset, IconGlobe } from './icons'

const NAV_LINKS = [
  { label: 'Vacantes Disponibles', active: true },
  { label: 'Especialidades Médicas', active: false },
  { label: 'Sobre Nosotros', active: false },
]

export default function SiteHeader({ onLogin, onHome }) {
  return (
    <header className="border-b border-black/5 bg-white px-4 py-2 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <button type="button" onClick={onHome} className="shrink-0">
          <img src={logo} alt="Preventiva Salud IPS" className="h-16 w-auto" />
        </button>

        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className={link.active ? 'text-[#1654a3]' : 'text-slate-500 hover:text-[#1654a3]'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <button type="button" className="hidden rounded-md p-2 text-slate-500 hover:bg-slate-100 sm:flex" aria-label="Ayuda">
            <IconHeadset className="h-4 w-4" />
          </button>
          <button type="button" className="hidden items-center gap-1 rounded-md px-2 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 sm:flex">
            <IconGlobe className="h-4 w-4" />
            ES
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="hidden font-semibold text-slate-600 hover:text-[#1654a3] md:inline"
          >
            Acceso Gestión Humana
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="rounded-lg bg-[#1654a3] px-4 py-2 font-bold text-white transition-colors hover:bg-[#134788]"
          >
            Ingreso Candidatos
          </button>
        </div>
      </div>
    </header>
  )
}
