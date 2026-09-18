import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../app/AppContext'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import Button from '../../components/Button'
import IconField from '../../components/IconField'
import {
  IconArrowLeft,
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconIdCard,
  IconCalendar,
  IconGraduationCap,
  IconBriefcase,
  IconFileCheck,
  IconUpload,
  IconDownload,
  IconPlus,
  IconX,
  IconTrash,
  IconCheck,
  IconClock,
  IconStethoscope,
  IconShieldCheck,
  IconCamera,
} from '../../components/icons'

const TABS = [
  { id: 'personal', label: 'Información Personal', icon: IconUser },
  { id: 'formacion', label: 'Formación Académica', icon: IconGraduationCap },
  { id: 'experiencia', label: 'Experiencia Laboral', icon: IconBriefcase },
]

const SPECIALTY_OPTIONS = [
  'Odontología General',
  'Medicina General',
  'Enfermería',
  'Psicología Clínica',
  'Administrativo en Salud',
  'Otro',
]

const EXPERIENCE_OPTIONS = ['Sin experiencia / Rural (SSO)', '1 a 3 años', '4 años o más / Especialista']

// El RETHUS y la tarjeta profesional solo aplican a cargos asistenciales/clínicos.
const REQUIRES_RETHUS = ['Odontología General', 'Medicina General', 'Enfermería', 'Psicología Clínica']

function getRequiredDocumentNames(specialty) {
  const base = ['Hoja de vida', 'Documento de identidad', 'Diploma o acta de grado']
  return REQUIRES_RETHUS.includes(specialty) ? [...base, 'Tarjeta profesional', 'Certificado RETHUS'] : base
}

function buildDocuments(specialty, statusByName = {}) {
  return getRequiredDocumentNames(specialty).map((name) => ({
    name,
    status: statusByName[name] ?? 'Pendiente',
  }))
}

const DEMO_PERSONAL = {
  fullName: 'Manuela Urrea Candamil',
  document: '1020345678',
  birthDate: '1996-04-12',
  city: 'Medellín',
  phone: '300 123 4567',
  email: 'Manuela.urrea@ejemplo.com',
}

const DEMO_PROFESSIONAL = {
  specialty: 'Odontología General',
  rethus: '110024982',
  license: 'COL-OD-4521',
  experience: EXPERIENCE_OPTIONS[1],
}

const DEMO_DOCUMENT_STATUS = {
  'Hoja de vida': 'Completo',
  'Documento de identidad': 'Completo',
  'Diploma o acta de grado': 'Pendiente',
  'Tarjeta profesional': 'Pendiente',
  'Certificado RETHUS': 'Pendiente',
}

const DEMO_EDUCATION = [
  { id: 'edu-1', institution: 'Universidad Nacional de Colombia', degree: 'Odontología', level: 'Profesional', year: '2020' },
]

const DEMO_EXPERIENCE = [
  {
    id: 'exp-1',
    company: 'Clínica Dental Sonrisas',
    role: 'Odontóloga General',
    period: '2021 - 2024',
    description: 'Atención odontológica general, operatoria y prótesis fija.',
  },
]

const DEMO_SKILLS = ['Operatoria dental', 'Atención al paciente', 'Excel']

function updateListItem(list, setList, id, field, value) {
  setList(list.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
}


function SectionCard({ icon: Icon, title, action, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-slate-700">
          <Icon className="h-4 w-4 text-[#1654a3]" />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  )
}

export default function Perfil() {
  const navigate = useNavigate()
  const { applications, profile, updateProfile } = useApp()
  const [photoUrl, setPhotoUrl] = useState(profile?.photoUrl ?? null)

  // Si viene de Registro, el perfil arranca casi vacío (solo lo que ya dio de alta).
  // Si no (entró por Login, simulando una cuenta existente), se ve con datos de ejemplo.
  const [personal, setPersonal] = useState(() =>
    profile
      ? { fullName: profile.fullName, document: profile.document, birthDate: '', city: profile.city, phone: '', email: profile.email }
      : DEMO_PERSONAL,
  )
  const [professional, setProfessional] = useState(() =>
    profile ? { specialty: profile.specialty, rethus: '', license: '', experience: '' } : DEMO_PROFESSIONAL,
  )
  const [cvFile, setCvFile] = useState(null)
  const [education, setEducation] = useState(() => (profile ? [] : DEMO_EDUCATION))
  const [experience, setExperience] = useState(() => (profile ? [] : DEMO_EXPERIENCE))
  const [skills, setSkills] = useState(() => (profile ? [] : DEMO_SKILLS))
  const [skillInput, setSkillInput] = useState('')
  const [documents, setDocuments] = useState(() =>
    buildDocuments(profile ? profile.specialty : DEMO_PROFESSIONAL.specialty, profile ? {} : DEMO_DOCUMENT_STATUS),
  )
  const [activeTab, setActiveTab] = useState('personal')

  const requiresRethus = REQUIRES_RETHUS.includes(professional.specialty)

  function updatePersonal(field, value) {
    setPersonal((p) => ({ ...p, [field]: value }))
  }

  function updateProfessional(field, value) {
    if (field === 'specialty') {
      setProfessional((p) => ({ ...p, specialty: value }))
      setDocuments((prev) => {
        const required = getRequiredDocumentNames(value)
        return required.map((name) => prev.find((d) => d.name === name) ?? { name, status: 'Pendiente' })
      })
      return
    }
    setProfessional((p) => ({ ...p, [field]: value }))
  }

  function addSkill() {
    const value = skillInput.trim()
    if (value && !skills.includes(value)) {
      setSkills([...skills, value])
    }
    setSkillInput('')
  }

  function markDocumentComplete(index) {
    setDocuments(documents.map((d, i) => (i === index ? { ...d, status: 'Completo' } : d)))
  }

  const personalFields = Object.values(personal)
  const personalPct = personalFields.filter(Boolean).length / personalFields.length
  const professionalFields = requiresRethus
    ? [professional.specialty, professional.rethus, professional.license, professional.experience]
    : [professional.specialty, professional.experience]
  const professionalPct = professionalFields.filter(Boolean).length / professionalFields.length
  const cvPct = cvFile ? 1 : 0
  const eduPct = education.length > 0 ? 1 : 0
  const expPct = experience.length > 0 ? 1 : 0
  const skillsPct = Math.min(skills.length / 3, 1)
  const docsPct = documents.filter((d) => d.status === 'Completo').length / documents.length
  const completion = Math.round(
    ((personalPct + professionalPct + cvPct + eduPct + expPct + skillsPct + docsPct) / 7) * 100,
  )

  const initials = personal.fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  // Mantiene el nombre y la foto visibles en el menú del header, sin importar
  // si el perfil llegó por Registro o por el Login de ejemplo.
  useEffect(() => {
    updateProfile({ fullName: personal.fullName, photoUrl })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personal.fullName, photoUrl])

  function handlePhotoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoUrl(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1654a3] hover:text-[#0ca3c5]"
        >
          <IconArrowLeft className="h-4 w-4" />
          Volver a Vacantes
        </button>

        {/* Encabezado de perfil */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <label className="group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#1654a3] text-lg font-bold text-white">
                {photoUrl ? (
                  <img src={photoUrl} alt="Foto de perfil" className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  initials || '??'
                )}
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <IconCamera className="h-5 w-5 text-white" />
                </span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
              <div>
                <h1 className="text-xl font-extrabold text-slate-800">{personal.fullName || 'Candidato'}</h1>
                <p className="text-sm text-slate-500">Perfil de Candidato · Preventiva Salud IPS</p>
              </div>
            </div>

            {cvFile ? (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <IconDownload className="h-3.5 w-3.5" />
                  Descargar CV
                </Button>
                <button
                  type="button"
                  onClick={() => setCvFile(null)}
                  className="text-slate-400 hover:text-red-500"
                  aria-label="Quitar hoja de vida"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setCvFile('Hoja-de-vida.pdf')}>
                <IconUpload className="h-3.5 w-3.5" />
                Subir Hoja de Vida
              </Button>
            )}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Perfil completo</span>
              <span>{completion}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#0ca3c5] transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'border-[#1654a3] text-[#1654a3]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Columna principal */}
          <div className="flex flex-col gap-6">
            {activeTab === 'personal' && (
              <>
                <SectionCard icon={IconUser} title="Información de Contacto">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <IconField
                      icon={IconUser}
                      value={personal.fullName}
                      onChange={(e) => updatePersonal('fullName', e.target.value)}
                      placeholder="Nombres y apellidos"
                    />
                    <IconField
                      icon={IconIdCard}
                      value={personal.document}
                      onChange={(e) => updatePersonal('document', e.target.value)}
                      placeholder="Número de documento"
                    />
                    <IconField
                      icon={IconCalendar}
                      type="date"
                      value={personal.birthDate}
                      onChange={(e) => updatePersonal('birthDate', e.target.value)}
                    />
                    <IconField
                      icon={IconMapPin}
                      value={personal.city}
                      onChange={(e) => updatePersonal('city', e.target.value)}
                      placeholder="Ciudad"
                    />
                    <IconField
                      icon={IconPhone}
                      value={personal.phone}
                      onChange={(e) => updatePersonal('phone', e.target.value)}
                      placeholder="Celular de contacto"
                    />
                    <IconField
                      icon={IconMail}
                      type="email"
                      value={personal.email}
                      onChange={(e) => updatePersonal('email', e.target.value)}
                      placeholder="Correo electrónico"
                    />
                  </div>
                </SectionCard>

                <SectionCard icon={IconStethoscope} title="Información Profesional">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="specialty" className="mb-1.5 block text-xs font-semibold text-slate-500">Cargo / Especialidad</label>
                      <select
                        id="specialty"
                        value={professional.specialty}
                        onChange={(e) => updateProfessional('specialty', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                      >
                        <option value="">Selecciona una opción</option>
                        {SPECIALTY_OPTIONS.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="experience" className="mb-1.5 block text-xs font-semibold text-slate-500">Años de Experiencia</label>
                      <select
                        id="experience"
                        value={professional.experience}
                        onChange={(e) => updateProfessional('experience', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
                      >
                        <option value="">Selecciona una opción</option>
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    {requiresRethus && (
                      <>
                        <IconField
                          icon={IconShieldCheck}
                          value={professional.rethus}
                          onChange={(e) => updateProfessional('rethus', e.target.value)}
                          placeholder="Número de Registro RETHUS"
                        />
                        <IconField
                          icon={IconIdCard}
                          value={professional.license}
                          onChange={(e) => updateProfessional('license', e.target.value)}
                          placeholder="Tarjeta profesional"
                        />
                      </>
                    )}
                  </div>
                  {!requiresRethus && professional.specialty && (
                    <p className="mt-3 text-xs text-slate-400">
                      Tu cargo no requiere registro RETHUS ni tarjeta profesional.
                    </p>
                  )}
                </SectionCard>

                <SectionCard icon={IconCheck} title="Conocimientos y Habilidades">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1.5 rounded-md bg-[#1654a3]/10 px-2.5 py-1.5 text-xs font-semibold text-[#1654a3]"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => setSkills(skills.filter((s) => s !== skill))}
                          aria-label={`Quitar ${skill}`}
                        >
                          <IconX className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-slate-400">Aún no has agregado habilidades.</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <IconField
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                      placeholder="Ej: Atención al paciente"
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline" onClick={addSkill}>
                      <IconPlus className="h-3.5 w-3.5" />
                      Agregar
                    </Button>
                  </div>
                </SectionCard>
              </>
            )}

            {activeTab === 'formacion' && (
              <SectionCard
                icon={IconGraduationCap}
                title="Formación Académica"
                action={
                  <button
                    type="button"
                    onClick={() =>
                      setEducation([
                        ...education,
                        { id: crypto.randomUUID(), institution: '', degree: '', level: '', year: '' },
                      ])
                    }
                    className="flex items-center gap-1 text-xs font-bold text-[#1654a3] hover:underline"
                  >
                    <IconPlus className="h-3.5 w-3.5" />
                    Agregar
                  </button>
                }
              >
                <div className="flex flex-col gap-4">
                  {education.map((item, i) => (
                    <div key={item.id} className="rounded-lg border border-slate-100 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Formación {i + 1}</span>
                        <button
                          type="button"
                          onClick={() => setEducation(education.filter((e) => e.id !== item.id))}
                          className="text-slate-400 hover:text-red-500"
                          aria-label="Eliminar formación"
                        >
                          <IconTrash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <IconField
                          value={item.institution}
                          onChange={(e) => updateListItem(education, setEducation, item.id, 'institution', e.target.value)}
                          placeholder="Institución"
                        />
                        <IconField
                          value={item.degree}
                          onChange={(e) => updateListItem(education, setEducation, item.id, 'degree', e.target.value)}
                          placeholder="Título obtenido"
                        />
                        <IconField
                          value={item.level}
                          onChange={(e) => updateListItem(education, setEducation, item.id, 'level', e.target.value)}
                          placeholder="Nivel (Técnico, Profesional, Especialización...)"
                        />
                        <IconField
                          value={item.year}
                          onChange={(e) => updateListItem(education, setEducation, item.id, 'year', e.target.value)}
                          placeholder="Año de grado"
                        />
                      </div>
                    </div>
                  ))}
                  {education.length === 0 && (
                    <p className="text-sm text-slate-400">Aún no has agregado formación académica.</p>
                  )}
                </div>
              </SectionCard>
            )}

            {activeTab === 'experiencia' && (
              <SectionCard
                icon={IconBriefcase}
                title="Experiencia Laboral"
                action={
                  <button
                    type="button"
                    onClick={() =>
                      setExperience([
                        ...experience,
                        { id: crypto.randomUUID(), company: '', role: '', period: '', description: '' },
                      ])
                    }
                    className="flex items-center gap-1 text-xs font-bold text-[#1654a3] hover:underline"
                  >
                    <IconPlus className="h-3.5 w-3.5" />
                    Agregar
                  </button>
                }
              >
                <div className="flex flex-col">
                  {experience.map((item, i) => (
                    <div
                      key={item.id}
                      className="relative border-l-2 border-slate-200 py-4 pl-6 first:pt-0 last:border-transparent last:pb-0"
                    >
                      <span className="absolute -left-[7px] top-4 h-3 w-3 rounded-full bg-[#1654a3] first:top-0" />
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Experiencia {i + 1}</span>
                        <button
                          type="button"
                          onClick={() => setExperience(experience.filter((e) => e.id !== item.id))}
                          className="text-slate-400 hover:text-red-500"
                          aria-label="Eliminar experiencia"
                        >
                          <IconTrash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <IconField
                          value={item.company}
                          onChange={(e) => updateListItem(experience, setExperience, item.id, 'company', e.target.value)}
                          placeholder="Empresa o institución"
                        />
                        <IconField
                          value={item.role}
                          onChange={(e) => updateListItem(experience, setExperience, item.id, 'role', e.target.value)}
                          placeholder="Cargo"
                        />
                        <IconField
                          value={item.period}
                          onChange={(e) => updateListItem(experience, setExperience, item.id, 'period', e.target.value)}
                          placeholder="Periodo (Ej: 2021 - 2024)"
                          className="sm:col-span-2"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateListItem(experience, setExperience, item.id, 'description', e.target.value)
                          }
                          placeholder="Funciones principales"
                          rows={2}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20 sm:col-span-2"
                        />
                      </div>
                    </div>
                  ))}
                  {experience.length === 0 && (
                    <p className="text-sm text-slate-400">Aún no has agregado experiencia laboral.</p>
                  )}
                </div>
              </SectionCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Documentos */}
            <SectionCard icon={IconFileCheck} title="Documentos">
              <ul className="flex flex-col gap-3">
                {documents.map((doc, i) => (
                  <li key={doc.name} className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-slate-600">{doc.name}</span>
                    {doc.status === 'Completo' ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#0ca3c5]">
                        <IconCheck className="h-3.5 w-3.5" />
                        Completo
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markDocumentComplete(i)}
                        className="flex items-center gap-1 text-xs font-bold text-[#ee7128] hover:underline"
                      >
                        <IconUpload className="h-3.5 w-3.5" />
                        Subir
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </SectionCard>

            {/* Mis postulaciones */}
            <SectionCard
              icon={IconClock}
              title="Mis Postulaciones"
              action={
                applications.length > 0 && (
                  <button
                    type="button"
                    onClick={() => navigate('/postulaciones')}
                    className="text-xs font-bold text-[#1654a3] hover:underline"
                  >
                    Ver todas
                  </button>
                )
              }
            >
              <div className="flex flex-col gap-4">
                {applications.slice(0, 3).map((app) => (
                  <div key={app.jobId ?? app.vacante} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-bold text-slate-800">{app.vacante}</p>
                    <p className="mt-1 text-xs text-slate-500">Postulado el {app.fecha}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded-md bg-[#0ca3c5]/10 px-2 py-1 text-[11px] font-bold text-[#0ca3c5]">
                        {app.estado}
                      </span>
                      <span className="text-[11px] text-slate-400">{app.etapa}</span>
                    </div>
                  </div>
                ))}
                {applications.length === 0 && (
                  <p className="text-sm text-slate-400">Aún no te has postulado a ninguna vacante.</p>
                )}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
