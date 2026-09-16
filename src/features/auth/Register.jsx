import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../app/AppContext'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import Button from '../../components/Button'
import IconField from '../../components/IconField'
import {
  IconIdCard,
  IconUser,
  IconMail,
  IconPhone,
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconUserPlus,
  IconShieldCheck,
  IconHeadset,
  IconArrowRight,
  IconSave,
  IconUpload,
  IconX,
  IconStethoscope,
  IconMapPin,
} from '../../components/icons'

const STEPS = [
  { n: 1, title: 'Datos Personales', desc: 'Identificación y contacto' },
  { n: 2, title: 'Perfil en Salud & RETHUS', desc: 'Especialidad y registro' },
  { n: 3, title: 'Soportes y Hoja de Vida', desc: 'Certificados y normatividad' },
]

const EXPERIENCE_OPTIONS = ['Sin experiencia / Rural (SSO)', '1 a 3 años', '4 años o más / Especialista']

function StepIndicator({ step }) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
      {STEPS.map((s) => {
        const isActive = s.n === step
        const isDone = s.n < step

        let circleClass = 'bg-slate-100 text-slate-400'
        if (isActive) {
          circleClass = 'bg-[#1654a3] text-white'
        } else if (isDone) {
          circleClass = 'bg-[#0ca3c5] text-white'
        }

        return (
          <div
            key={s.n}
            className={`flex items-center gap-3 rounded-lg p-3 ${isActive ? 'bg-[#1654a3]/5' : ''}`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${circleClass}`}
            >
              {isDone ? <IconCheck className="h-4 w-4" /> : s.n}
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Paso {s.n}</p>
              <p className={`text-sm font-bold ${isActive ? 'text-[#1654a3]' : 'text-slate-700'}`}>{s.title}</p>
              <p className="text-xs text-slate-400">{s.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function UploadRow({ label, file, onUpload, onRemove }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-700">
          {label} <span className="text-[#ee7128]">*</span>
        </p>
        {file && <p className="text-xs text-slate-500">{file}</p>}
      </div>
      {file ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-slate-400 hover:text-red-500"
          aria-label={`Quitar ${label}`}
        >
          <IconX className="h-4 w-4" />
        </button>
      ) : (
        <Button type="button" size="sm" variant="outline" onClick={onUpload}>
          <IconUpload className="h-3.5 w-3.5" />
          Subir
        </Button>
      )}
    </div>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const [form, setForm] = useState({
    docType: 'CC',
    document: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    city: '',
    rethus: '',
    license: '',
    experience: EXPERIENCE_OPTIONS[0],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [documents, setDocuments] = useState({ cv: null, diploma: null, license: null, rethusCert: null })
  const [acceptsData, setAcceptsData] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function uploadDoc(field, filename) {
    setDocuments((d) => ({ ...d, [field]: filename }))
  }

  function handleStepSubmit(e) {
    e.preventDefault()

    if (step === 1 && form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setError('')

    if (step < 3) {
      setStep(step + 1)
      return
    }

    login('candidato')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <SiteHeader />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-8">
        {/* Hero */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#1654a3]/10 px-3 py-1 text-xs font-bold text-[#1654a3]">
            Convocatoria Asistencial 2026
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-800 sm:text-4xl">
            Creación de Cuenta y Registro Asistencial
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Únete a nuestra red hospitalaria y de atención ambulatoria en Colombia. Completa tu perfil
            profesional en 3 sencillos pasos.
          </p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="mt-3 text-sm font-semibold text-[#1654a3] hover:underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>

        {/* Indicador de pasos */}
        <div className="mt-8">
          <StepIndicator step={step} />
        </div>

        {/* Formulario */}
        <form onSubmit={handleStepSubmit} className="mt-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          {step === 1 && (
            <>
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">
                    Información Personal y Credenciales de Acceso
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Ingresa tus nombres completos tal y como aparecen en tu documento oficial de identidad.
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                  Requerido para nómina asistencial
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="docType" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Tipo de Documento <span className="text-[#ee7128]">*</span>
                  </label>
                  <select
                    id="docType"
                    value={form.docType}
                    onChange={(e) => update('docType', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                  >
                    <option value="CC">Cédula de Ciudadanía (C.C.)</option>
                    <option value="CE">Cédula de Extranjería (C.E.)</option>
                    <option value="PA">Pasaporte</option>
                    <option value="PEP">Permiso Especial de Permanencia</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="document" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Número de Identificación <span className="text-[#ee7128]">*</span>
                  </label>
                  <IconField
                    id="document"
                    icon={IconIdCard}
                    required
                    value={form.document}
                    onChange={(e) => update('document', e.target.value)}
                    placeholder="Ej. 1020345678"
                  />
                </div>

                <div>
                  <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Nombres Completos <span className="text-[#ee7128]">*</span>
                  </label>
                  <IconField
                    id="firstName"
                    icon={IconUser}
                    required
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    placeholder="Ej. Laura Marcela"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Apellidos Completos <span className="text-[#ee7128]">*</span>
                  </label>
                  <IconField
                    id="lastName"
                    icon={IconUser}
                    required
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    placeholder="Ej. Gómez Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Correo Electrónico Institucional o Personal <span className="text-[#ee7128]">*</span>
                  </label>
                  <IconField
                    id="email"
                    icon={IconMail}
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="profesional@correo.com"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Recibirás notificaciones del proceso y ofertas asistenciales.
                  </p>
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Celular con WhatsApp Activo <span className="text-[#ee7128]">*</span>
                  </label>
                  <IconField
                    id="phone"
                    icon={IconPhone}
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+57 300 123 4567"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Para citación inmediata a entrevistas y pruebas clínicas.
                  </p>
                </div>

                <div>
                  <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Contraseña Segura <span className="text-[#ee7128]">*</span>
                  </label>
                  <IconField
                    id="password"
                    icon={IconLock}
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
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
                <div>
                  <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Confirmar Contraseña <span className="text-[#ee7128]">*</span>
                  </label>
                  <IconField
                    id="confirmPassword"
                    icon={IconLock}
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    placeholder="Repite tu contraseña"
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showConfirmPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                      </button>
                    }
                  />
                </div>
              </div>

              {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-lg font-extrabold text-slate-800">Perfil en Salud &amp; RETHUS</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Cuéntanos tu especialidad y datos de registro ante el Ministerio de Salud.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="specialty" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Especialidad o Profesión <span className="text-[#ee7128]">*</span>
                  </label>
                  <div className="relative">
                    <IconStethoscope className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      id="specialty"
                      required
                      value={form.specialty}
                      onChange={(e) => update('specialty', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                    >
                      <option value="">Selecciona una opción</option>
                      <option>Odontología General</option>
                      <option>Medicina General</option>
                      <option>Enfermería</option>
                      <option>Psicología Clínica</option>
                      <option>Administrativo en Salud</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Ciudad de Residencia <span className="text-[#ee7128]">*</span>
                  </label>
                  <IconField
                    id="city"
                    icon={IconMapPin}
                    required
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    placeholder="Ej. Bogotá D.C."
                  />
                </div>

                <div>
                  <label htmlFor="rethus" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Número de Registro RETHUS
                  </label>
                  <IconField
                    id="rethus"
                    icon={IconShieldCheck}
                    value={form.rethus}
                    onChange={(e) => update('rethus', e.target.value)}
                    placeholder="Ej. 110024982"
                  />
                </div>
                <div>
                  <label htmlFor="license" className="mb-1.5 block text-sm font-semibold text-slate-700">Tarjeta Profesional</label>
                  <IconField
                    id="license"
                    icon={IconIdCard}
                    value={form.license}
                    onChange={(e) => update('license', e.target.value)}
                    placeholder="Número de tarjeta profesional"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="experience" className="mb-1.5 block text-sm font-semibold text-slate-700">Años de Experiencia</label>
                  <select
                    id="experience"
                    value={form.experience}
                    onChange={(e) => update('experience', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20 sm:w-1/2"
                  >
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-lg font-extrabold text-slate-800">Soportes y Hoja de Vida</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Adjunta tus certificados en PDF. Podrás completarlos más adelante desde tu perfil.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <UploadRow
                  label="Hoja de Vida"
                  file={documents.cv}
                  onUpload={() => uploadDoc('cv', 'Hoja-de-vida.pdf')}
                  onRemove={() => uploadDoc('cv', null)}
                />
                <UploadRow
                  label="Diploma o Acta de Grado"
                  file={documents.diploma}
                  onUpload={() => uploadDoc('diploma', 'Diploma.pdf')}
                  onRemove={() => uploadDoc('diploma', null)}
                />
                <UploadRow
                  label="Tarjeta Profesional"
                  file={documents.license}
                  onUpload={() => uploadDoc('license', 'Tarjeta-profesional.pdf')}
                  onRemove={() => uploadDoc('license', null)}
                />
                <UploadRow
                  label="Certificado RETHUS"
                  file={documents.rethusCert}
                  onUpload={() => uploadDoc('rethusCert', 'Certificado-RETHUS.pdf')}
                  onRemove={() => uploadDoc('rethusCert', null)}
                />
              </div>

              <label className="mt-5 flex items-start gap-2.5 text-sm text-slate-600">
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
            </>
          )}

          {/* Navegación del formulario */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
            >
              <IconSave className="h-4 w-4" />
              Guardar borrador
            </button>

            <div className="flex items-center gap-3">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Atrás
                </Button>
              )}
              <Button type="submit">
                {step < 3 ? 'Continuar al Paso Siguiente' : 'Crear mi cuenta'}
                {step < 3 ? <IconArrowRight className="h-4 w-4" /> : <IconUserPlus className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </form>

        {/* Confianza */}
        <div className="mt-6 flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 sm:flex-row">
          <span className="flex items-center gap-1.5">
            <IconShieldCheck className="h-4 w-4 text-[#1654a3]" />
            Proceso Seguro Cifrado SSL 256-bit
          </span>
          <span className="flex items-center gap-1.5">
            <IconCheck className="h-4 w-4 text-[#0ca3c5]" />
            Conexión Directa con Validación RETHUS
          </span>
          <span className="flex items-center gap-1.5">
            <IconHeadset className="h-4 w-4 text-[#1654a3]" />
            Soporte a Candidatos: talento@preventivasalud.com
          </span>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
