import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../app/AppContext'
import logo from '../assets/logo-preventiva.png'
import Button from './Button'
import {
  IconHeadset,
  IconGlobe,
  IconUser,
  IconClock,
  IconBriefcase,
  IconBookmark,
  IconSettings,
  IconLogout,
} from './icons'

const NAV_LINKS = [
  { label: 'Vacantes Disponibles', active: true },
  { label: 'Especialidades Médicas', active: false },
  { label: 'Sobre Nosotros', active: false },
]

function MenuItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
        danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  )
}

export default function SiteHeader() {
  const navigate = useNavigate()
  const { session, profile, logout } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  const initials = profile?.fullName
    ? profile.fullName
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : ''

  function goTo(path) {
    setMenuOpen(false)
    navigate(path)
  }

  function handleLogout() {
    setMenuOpen(false)
    logout()
    navigate('/')
  }

  return (
    <header className="border-b border-black/5 bg-white px-4 py-2 sm:px-8">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-6">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Preventiva Salud IPS" className="h-16 w-auto" />
        </Link>

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
          {session?.role === 'candidato' ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1654a3] text-sm font-bold text-white ring-2 ring-transparent transition-all hover:ring-[#1654a3]/30"
                aria-label="Menú de cuenta"
              >
                {profile?.photoUrl ? (
                  <img src={profile.photoUrl} alt="Foto de perfil" className="h-10 w-10 object-cover" />
                ) : (
                  initials || <IconUser className="h-4 w-4" />
                )}
              </button>

              {menuOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Cerrar menú"
                  />
                  <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    {profile?.fullName && (
                      <div className="border-b border-slate-100 px-3 py-2.5">
                        <p className="truncate text-sm font-bold text-slate-800">{profile.fullName}</p>
                        <p className="text-xs text-slate-400">Candidato</p>
                      </div>
                    )}
                    <div className="flex flex-col gap-0.5 py-1.5">
                      <MenuItem icon={IconUser} label="Ir al perfil" onClick={() => goTo('/perfil')} />
                      <MenuItem icon={IconClock} label="Ver mis postulaciones" onClick={() => goTo('/postulaciones')} />
                      <MenuItem icon={IconBriefcase} label="Sugeridos" onClick={() => goTo('/sugeridos')} />
                      <MenuItem icon={IconBookmark} label="Guardados" onClick={() => goTo('/guardados')} />
                      <MenuItem icon={IconSettings} label="Configuraciones" onClick={() => goTo('/configuracion')} />
                      <MenuItem icon={IconHeadset} label="Ayuda" onClick={() => setMenuOpen(false)} />
                    </div>
                    <div className="border-t border-slate-100 pt-1.5">
                      <MenuItem icon={IconLogout} label="Cerrar sesión" onClick={handleLogout} danger />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-slate-600 hover:text-[#1654a3]"
              >
                Iniciar sesión
              </button>
              <Button onClick={() => navigate('/registro')} size="sm">
                Crear cuenta
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
