import { useState } from 'react'
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
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconUserPlus,
  IconShieldCheck,
  IconHeadset,
  IconStethoscope,
  IconMapPin,
} from '../../components/icons'

const SPECIALTY_OPTIONS = [
  'Odontología General',
  'Medicina General',
  'Enfermería',
  'Psicología Clínica',
  'Administrativo en Salud',
  'Otro',
]

export default function Register() {
  const navigate = useNavigate()
  const { login, registerProfile } = useApp()
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    docType: 'CC',
    document: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    city: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptsData, setAcceptsData] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setError('')

    registerProfile({
      fullName: `${form.firstName} ${form.lastName}`.trim(),
      docType: form.docType,
      document: form.document,
      email: form.email,
      city: form.city,
      specialty: form.specialty,
    })
    login('candidato')
    navigate('/perfil')
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <SiteHeader />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-8 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="mb-6 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-extrabold text-slate-800">Datos básicos de tu cuenta</h2>
            <p className="mt-1 text-sm text-slate-500">
              Después de crear tu cuenta podrás completar hoja de vida, experiencia, formación académica y los
              documentos que apliquen según tu cargo (por ejemplo, RETHUS solo aplica a algunos cargos).
            </p>
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
                Número de Documento <span className="text-[#ee7128]">*</span>
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
                Nombres <span className="text-[#ee7128]">*</span>
              </label>
              <IconField
                id="firstName"
                icon={IconUser}
                required
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                placeholder="Ej. Manuela"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Apellidos <span className="text-[#ee7128]">*</span>
              </label>
              <IconField
                id="lastName"
                icon={IconUser}
                required
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                placeholder="Ej. Urrea Candamil"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Correo Electrónico <span className="text-[#ee7128]">*</span>
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
            </div>

            <div>
              <label htmlFor="specialty" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Cargo / Especialidad o Profesión <span className="text-[#ee7128]">*</span>
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
                  {SPECIALTY_OPTIONS.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
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
                placeholder="Ej. Medellín"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Contraseña <span className="text-[#ee7128]">*</span>
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

          <Button type="submit" size="lg" fullWidth className="mt-6">
            Crear mi cuenta
            <IconUserPlus className="h-4 w-4" />
          </Button>
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
