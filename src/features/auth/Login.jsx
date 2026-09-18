import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../app/AppContext'
import { BRAND } from '../../components/brand'
import logo from '../../assets/logo-preventiva.png'
import SiteHeader from '../../components/SiteHeader'
import Button from '../../components/Button'
import IconField from '../../components/IconField'
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconUserPlus,
  IconLogin,
} from '../../components/icons'

const HIGHLIGHTS = [
  'Postulación en menos de 2 minutos',
  'Seguimiento del proceso en tiempo real',
  'Validación segura de credenciales médicas',
]

export default function Login() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#eef2f7]">
      <SiteHeader />

      {/* Contenido principal */}
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
        <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10 lg:grid-cols-2">
          {/* Panel izquierdo */}
          <section
            className="flex flex-col gap-10 p-8 text-white sm:p-10 lg:p-12"
            style={{
              background: `linear-gradient(160deg, ${BRAND.blue} 0%, ${BRAND.blueDark} 55%, #0f3d78 100%)`,
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-4 self-start rounded-xl bg-white/15 py-3 pl-4 pr-3 backdrop-blur-sm">
              <img src={logo} alt="Preventiva Salud IPS" className="h-16 w-auto" />
              <div className="h-12 w-px bg-white/25" />
              <span className="rounded-md bg-[#ee7128] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
                PORTAL EMPLEO
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-[2rem]">
                Bienvenido al ecosistema de talento de Preventiva Salud IPS
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-blue-100/85 sm:text-base">
                Conéctate con nuestra red de atención médica integral, salud mental y odontología de alta complejidad
                en todo el país.
              </p>
            </div>

            {/* Highlights */}
            <ul className="flex flex-col gap-3">
              {HIGHLIGHTS.map((text) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-blue-50">
                  <IconCheck className="h-4 w-4 shrink-0 text-[#0ca3c5]" />
                  {text}
                </li>
              ))}
            </ul>

            <p className="mt-auto text-xs text-blue-100/70">
              Más de 500 profesionales de la salud ya hacen parte de Preventiva Salud IPS.
            </p>
          </section>

          {/* Panel derecho */}
          <section className="flex flex-col bg-white p-8 sm:p-10 lg:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-slate-800">Iniciar sesión en tu cuenta</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Ingresa tus credenciales para postularte a nuevas vacantes o consultar el estado de tus procesos
                activos.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Correo */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Correo Electrónico <span className="text-[#ee7128]">*</span>
                </label>
                <IconField
                  icon={IconMail}
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.com"
                />
              </div>

              {/* Contraseña */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Contraseña de Acceso <span className="text-[#ee7128]">*</span>
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#1654a3] hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <IconField
                  icon={IconLock}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu clave personal de ingreso"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                    </button>
                  }
                />
              </div>

              {/* Recordar */}
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#1654a3] focus:ring-[#1654a3]/30"
                />
                Recordar mis datos en este equipo
              </label>

              {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

              {/* Submit */}
              <Button type="submit" size="lg" fullWidth disabled={submitting}>
                {submitting ? 'Ingresando...' : 'Ingresar a mi perfil'}
                <IconLogin className="h-4 w-4" />
              </Button>
            </form>

            {/* Crear cuenta */}
            <div className="mt-auto border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                ¿Aún no tienes cuenta? Postúlate y haz parte del equipo médico.
              </p>
              <Button variant="accentOutline" onClick={() => navigate('/registro')} className="mt-3 w-full sm:w-auto">
                <IconUserPlus className="h-4 w-4" />
                Crear cuenta y cargar hoja de vida
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white px-4 py-5 text-xs text-slate-500 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <span className="font-semibold text-slate-700">Preventiva Salud IPS S.A.S.</span> · Vigilado
            Supersalud
          </span>
          <a href="#" className="hover:text-[#1654a3] hover:underline">
            Política de Tratamiento de Datos (Ley 1581)
          </a>
        </div>
      </footer>
    </div>
  )
}
