import { useState } from 'react'

/* Paleta de marca Preventiva Salud IPS */
const BRAND = {
  blue: '#1654a3',
  blueDark: '#145299',
  teal: '#0ca3c5',
  orange: '#ee7128',
  gray: '#a09f9e',
  slate: '#2d5461',
  purple: '#7b4c9e',
}

function IconArrowLeft(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  )
}

function IconHeadset(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h3" />
      <path d="M3 12v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H3" />
      <path d="M9 20a3 3 0 0 0 6 0" />
    </svg>
  )
}

function IconGlobe(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  )
}

function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconBriefcase(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function IconIdCard(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <circle cx="8" cy="11" r="2" />
      <path d="M5 17c.5-1.7 1.7-2.5 3-2.5s2.5.8 3 2.5" />
      <path d="M14 9h6" />
      <path d="M14 13h6" />
    </svg>
  )
}

function IconLock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function IconEye(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconEyeOff(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a20.3 20.3 0 0 1-4.24 5.34" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  )
}

function IconShieldLock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
      <path d="M12 10v4" />
    </svg>
  )
}

function IconZap(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  )
}

function IconRefresh(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
      <path d="M3 21v-5h5" />
      <path d="M21 3v5h-5" />
    </svg>
  )
}

function IconShieldCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconUserPlus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6" />
      <path d="M22 11h-6" />
    </svg>
  )
}

function IconLogin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  )
}

function IconBuilding(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  )
}

const FEATURES = [
  {
    icon: IconZap,
    title: 'Postulación ágil en menos de 2 minutos',
    text: 'Diligencia tu perfil clínico o asistencial una sola vez y aplica de forma directa con tu CV cargado.',
  },
  {
    icon: IconRefresh,
    title: 'Seguimiento transparente en tiempo real',
    text: 'Visualiza el avance de tu postulación desde la revisión curricular hasta la firma digital del contrato.',
  },
  {
    icon: IconShieldCheck,
    title: 'Validación directa de credenciales y Rethus',
    text: 'Integración segura para validar colegiaturas médicas, registros y acreditaciones sanitarias.',
  },
]

export default function Login() {
  const [role, setRole] = useState('candidato')
  const [docType, setDocType] = useState('CC')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar con el servicio de autenticación
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#eef2f7]">
      {/* Barra superior */}
      <header className="flex items-center justify-between gap-4 border-b border-black/5 bg-white px-4 py-3 sm:px-8">
        <a
          href="#"
          className="flex items-center gap-2 text-sm font-semibold text-[#1654a3] hover:text-[#0ca3c5] transition-colors"
        >
          <IconArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Volver a Vacantes Disponibles</span>
          <span className="sm:hidden">Volver</span>
        </a>

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
            className="flex flex-col gap-8 p-8 text-white sm:p-10 lg:p-12"
            style={{
              background: `linear-gradient(160deg, ${BRAND.blue} 0%, ${BRAND.blueDark} 55%, #0f3d78 100%)`,
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-2xl font-extrabold leading-none">
                <span>Preventi</span>
                <span className="relative">
                  <span className="text-[#ee7128]">/</span>
                  <span className="absolute -left-[2px] -top-1 text-[#0ca3c5]">·</span>
                </span>
                <span>a</span>
                <span className="ml-1 flex flex-col text-[11px] font-bold leading-tight tracking-wide text-[#0ca3c5]">
                  <span>Salud</span>
                  <span>IPS</span>
                </span>
              </div>
              <span className="rounded-md bg-[#ee7128] px-2.5 py-1 text-[11px] font-bold tracking-wide">
                PORTAL EMPLEO
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-[2rem]">
                Bienvenido al ecosistema de talento de Preventiva Salud IPS
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-blue-100/90 sm:text-base">
                Conéctate con nuestra red de atención médica integral, salud mental (
                <span className="font-semibold text-white">Preventivamente</span>) y odontología de alta complejidad en
                todo el país.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-[#0ca3c5]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-blue-100/80">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonio */}
            <div className="mt-auto flex gap-3 border-t border-white/15 pt-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ee7128] text-sm font-bold">
                CR
              </div>
              <div>
                <p className="text-sm font-bold text-white">Dra. Claudia Marcela Restrepo</p>
                <p className="text-xs text-blue-100/80">Coordinadora Médica de Consulta Externa · Sede Bogotá</p>
                <p className="mt-1.5 text-xs italic leading-relaxed text-blue-100/90">
                  "En Preventiva Salud encontré estabilidad laboral, respeto por el acto médico y un equipo asistencial
                  que vela por la salud preventiva de las familias colombianas."
                </p>
              </div>
            </div>
          </section>

          {/* Panel derecho */}
          <section className="flex flex-col bg-white p-8 sm:p-10 lg:p-12">
            {/* Tabs de rol */}
            <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setRole('candidato')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  role === 'candidato'
                    ? 'bg-white text-[#1654a3] shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <IconUsers className="h-4 w-4" />
                Soy Candidato / Aspirante
              </button>
              <button
                type="button"
                onClick={() => setRole('reclutador')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  role === 'reclutador'
                    ? 'bg-white text-[#1654a3] shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <IconBriefcase className="h-4 w-4" />
                Gestión Humana &amp; Reclutadores
              </button>
            </div>

            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">Iniciar Sesión en tu Cuenta</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  Ingresa tus credenciales para postularte a nuevas vacantes o consultar el estado de tus procesos
                  activos.
                </p>
              </div>
              <span className="shrink-0 whitespace-nowrap rounded-md bg-[#0ca3c5]/10 px-3 py-1.5 text-xs font-bold text-[#0ca3c5]">
                Acceso Talento
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Tipo de documento */}
              <div>
                <label htmlFor="docType" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Tipo de Documento de Identidad <span className="text-[#ee7128]">*</span>
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

              {/* Documento o correo */}
              <div>
                <label htmlFor="identifier" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Número de Documento o Correo Registrado <span className="text-[#ee7128]">*</span>
                </label>
                <div className="relative">
                  <IconIdCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Ej: 1020345678 o tu.correo@ejemplo.com"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Contraseña de Acceso <span className="text-[#ee7128]">*</span>
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#1654a3] hover:underline">
                    ¿Olvidaste tu contraseña o documento?
                  </a>
                </div>
                <div className="relative">
                  <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Introduce tu clave personal de ingreso"
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

              {/* Recordar y SSL */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#1654a3] focus:ring-[#1654a3]/30"
                  />
                  Recordar mis datos en este equipo confiable
                </label>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <IconShieldLock className="h-3.5 w-3.5" />
                  Cifrado SSL 256-bit
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1654a3] py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#134788]"
              >
                Ingresar a mi Perfil
                <IconLogin className="h-4 w-4" />
              </button>
            </form>

            {/* Separador */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">O autentícate mediante canal institucional</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Canales institucionales */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <IconIdCard className="h-4 w-4 text-[#0ca3c5]" />
                Cédula Digital Nacional
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <IconBuilding className="h-4 w-4 text-[#1654a3]" />
                Acceso Único GOV.CO
              </button>
            </div>

            {/* Crear cuenta */}
            <div className="mt-auto pt-8 text-center">
              <p className="text-sm text-slate-500">
                ¿Aún no tienes cuenta registrada? Postúlate y haz parte del equipo médico.
              </p>
              <button
                type="button"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ee7128] py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#d9611f] sm:w-auto sm:px-6"
              >
                <IconUserPlus className="h-4 w-4" />
                Crear cuenta nueva y cargar Hoja de Vida
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white px-4 py-5 text-xs text-slate-500 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-slate-700">Preventiva Salud IPS S.A.S.</span>
            <span className="text-slate-300">•</span>
            <span>Vigilado Superintendencia Nacional de Salud</span>
            <span className="text-slate-300">•</span>
            <span>Código Prestador Habilitado 1100109283</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="#" className="hover:text-[#1654a3] hover:underline">
              Política de Tratamiento de Datos (Ley 1581)
            </a>
            <a href="#" className="hover:text-[#1654a3] hover:underline">
              Términos de Convocatoria
            </a>
            <a href="#" className="hover:text-[#1654a3] hover:underline">
              Línea Ética y Transparencia
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
