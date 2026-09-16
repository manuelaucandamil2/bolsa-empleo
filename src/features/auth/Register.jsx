import { useState } from 'react'
import { BRAND } from '../../shared/brand'
import logo from '../../assets/logo-preventiva.png'
import {
  IconArrowLeft,
  IconHeadset,
  IconGlobe,
  IconIdCard,
  IconUser,
  IconMail,
  IconPhone,
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconUserPlus,
  IconLogin,
} from '../../shared/icons'

const HIGHLIGHTS = [
  'Regístrate en menos de 5 minutos',
  'Carga tu hoja de vida una sola vez',
  'Postúlate a todas las vacantes disponibles',
]

export default function Register({ onBackToLogin }) {
  const [docType, setDocType] = useState('CC')
  const [document, setDocument] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptsData, setAcceptsData] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setError('')
    // TODO: conectar con el servicio de registro
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#eef2f7]">
      {/* Barra superior */}
      <header className="flex items-center justify-between gap-4 border-b border-black/5 bg-white px-4 py-3 sm:px-8">
        <button
          type="button"
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-sm font-semibold text-[#1654a3] hover:text-[#0ca3c5] transition-colors"
        >
          <IconArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Volver a Iniciar Sesión</span>
          <span className="sm:hidden">Volver</span>
        </button>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="hidden items-center gap-2 md:flex">
            <IconHeadset className="h-4 w-4 text-[#1654a3]" />
            <span>
              Mesa de Ayuda Talento:{' '}
              <a href="mailto:soporte.rrhh@preventivasalud.com" className="font-medium text-[#1654a3] hover:underline">
                soporte.rrhh@preventivasalud.com
              </a>
            </span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 font-semibold text-slate-700 hover:bg-slate-100"
          >
            <IconGlobe className="h-4 w-4" />
            ES
          </button>
        </div>
      </header>

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
                Haz parte del equipo médico de Preventiva Salud IPS
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-blue-100/85 sm:text-base">
                Crea tu cuenta, completa tu perfil y postúlate a nuestras vacantes clínicas, asistenciales y
                administrativas en todo el país.
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
              <h2 className="text-2xl font-extrabold text-slate-800">Crea tu cuenta de candidato</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Regístrate para postularte a nuestras vacantes. Podrás completar tu hoja de vida después de crear
                tu cuenta.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nombres y apellidos */}
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Nombres y Apellidos <span className="text-[#ee7128]">*</span>
                </label>
                <div className="relative">
                  <IconUser className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej: Laura Andrea Gómez Pérez"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                  />
                </div>
              </div>

              {/* Documento */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,11rem)_1fr]">
                <div>
                  <label htmlFor="docType" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Tipo <span className="text-[#ee7128]">*</span>
                  </label>
                  <select
                    id="docType"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PA">Pasaporte (PA)</option>
                    <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="document" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Número de Documento <span className="text-[#ee7128]">*</span>
                  </label>
                  <div className="relative">
                    <IconIdCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="document"
                      type="text"
                      required
                      value={document}
                      onChange={(e) => setDocument(e.target.value)}
                      placeholder="Ej: 1020345678"
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Correo y celular */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Correo Electrónico <span className="text-[#ee7128]">*</span>
                  </label>
                  <div className="relative">
                    <IconMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu.correo@ejemplo.com"
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Celular de Contacto <span className="text-[#ee7128]">*</span>
                  </label>
                  <div className="relative">
                    <IconPhone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="300 123 4567"
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Contraseña y confirmación */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Contraseña <span className="text-[#ee7128]">*</span>
                  </label>
                  <div className="relative">
                    <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Confirmar Contraseña <span className="text-[#ee7128]">*</span>
                  </label>
                  <div className="relative">
                    <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite tu contraseña"
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showConfirmPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

              {/* Tratamiento de datos */}
              <label className="flex items-start gap-2.5 text-sm text-slate-600">
                <input
                  type="checkbox"
                  required
                  checked={acceptsData}
                  onChange={(e) => setAcceptsData(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#1654a3] focus:ring-[#1654a3]/30"
                />
                <span>
                  Autorizo el tratamiento de mis datos personales conforme a la{' '}
                  <a href="#" className="font-semibold text-[#1654a3] hover:underline">
                    Política de Tratamiento de Datos (Ley 1581)
                  </a>
                  .
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1654a3] py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#134788]"
              >
                Crear mi cuenta
                <IconUserPlus className="h-4 w-4" />
              </button>
            </form>

            {/* Volver a login */}
            <div className="mt-auto border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">¿Ya tienes una cuenta?</p>
              <button
                type="button"
                onClick={onBackToLogin}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:px-6"
              >
                <IconLogin className="h-4 w-4" />
                Inicia sesión
              </button>
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
