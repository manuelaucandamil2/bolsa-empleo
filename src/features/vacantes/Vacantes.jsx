import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../app/AppContext'
import { BRAND } from '../../components/brand'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import Button from '../../components/Button'
import IconField from '../../components/IconField'
import JobListItem from './JobListItem'
import JobDetailPanel from './JobDetailPanel'
import { JOBS } from './jobsData'
import {
  IconUsers,
  IconBriefcase,
  IconSearch,
  IconMapPin,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconArrowRight,
  IconTooth,
  IconBrain,
  IconStethoscope,
  IconBell,
  IconSmile,
  IconMail,
  IconBookmark,
  IconEye,
} from '../../components/icons'

const STATS = [
  { icon: IconBriefcase, value: '45+', label: 'Convocatorias abiertas' },
  { icon: IconUsers, value: '1,200+', label: 'Colaboradores activos' },
  { icon: IconSmile, value: '98%', label: 'Clima laboral positivo' },
]

const JOB_TYPE_FILTERS = [
  { label: 'Tiempo Completo', count: 32, defaultChecked: true },
  { label: 'Medio Tiempo', count: 8, defaultChecked: false },
  { label: 'Por Prestación de Servicio', count: 15, defaultChecked: false },
]

const MODALITY_FILTERS = [
  { label: 'Presencial en Sede', count: 38, defaultChecked: true },
  { label: 'Telemedicina / Híbrido', count: 7, defaultChecked: false },
]

const SALARY_FILTERS = [
  '$2.000.000 - $4.000.000',
  '$4.000.000 - $6.500.000',
  'Más de $6.500.000 COP',
]

const EXPERIENCE_FILTERS = [
  { label: 'Sin experiencia / Rural (SSO)', defaultChecked: true },
  { label: '1 a 3 años de experiencia', defaultChecked: true },
  { label: 'Más de 4 años / Especialista', defaultChecked: false },
]

const SPECIALTIES = [
  {
    icon: IconTooth,
    title: 'Preventiva Salud Odontología',
    description: 'Equipos de última generación, sillones ergonómicos, radiología periapical digital y una sólida base de pacientes en rehabilitación oral y periodoncia.',
    linkLabel: '14 Vacantes Especializadas',
  },
  {
    icon: IconBrain,
    title: 'Preventivamente Clínica',
    description: 'Un entorno empático y ético dedicado a la salud mental, psiquiatría de enlace, neuropsicología y terapia familiar con respaldo interdisciplinario.',
    linkLabel: '12 Vacantes en Psicología y Psiquiatría',
  },
  {
    icon: IconStethoscope,
    title: 'Medicina y Red Ambulatoria',
    description: 'Programas de prevención y promoción (PyP), medicina laboral, consulta externa prioritaria y toma de muestras diagnósticas con altos estándares ISO.',
    linkLabel: '19 Convocatorias Disponibles',
  },
]


function FilterCheckbox({ label, count, defaultChecked }) {
  return (
    <label className="flex items-center justify-between gap-2 text-sm text-slate-600">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="h-4 w-4 rounded border-slate-300 text-[#1654a3] focus:ring-[#1654a3]/30"
        />
        {label}
      </span>
      {typeof count === 'number' && <span className="text-xs text-slate-400">({count})</span>}
    </label>
  )
}

function FilterPill({ label, isOpen, onToggle, children }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
          isOpen ? 'border-[#1654a3] bg-[#1654a3]/5 text-[#1654a3]' : 'border-slate-200 text-slate-600 hover:border-slate-300'
        }`}
      >
        {label}
        <IconChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Vacantes() {
  const navigate = useNavigate()
  const { jobId } = useParams()
  const { session, applications, profile } = useApp()
  const [openFilter, setOpenFilter] = useState(null)
  const [page, setPage] = useState(1)
  const totalPages = 8
  const isCandidate = session?.role === 'candidato'
  const selectedJob = JOBS.find((j) => j.id === jobId) ?? JOBS[0]

  function toggleFilter(name) {
    setOpenFilter((current) => (current === name ? null : name))
  }

  const candidateStats = [
    { icon: IconBriefcase, value: applications.length, label: 'Postulaciones activas' },
    { icon: IconBookmark, value: 3, label: 'Vacantes guardadas' },
    { icon: IconEye, value: 12, label: 'Vistas a tu perfil' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <SiteHeader />

      {/* Bienvenida del candidato */}
      {isCandidate && (
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-[1800px] px-4 py-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-lg font-extrabold text-slate-800">
                  Hola, {profile?.fullName?.split(' ')[0] ?? 'Candidato'} 👋
                </h1>
                <p className="text-sm text-slate-500">
                  Tienes {applications.length} postulaciones activas. Sigue explorando nuevas oportunidades.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                {candidateStats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0ca3c5]/10 text-[#0ca3c5]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold leading-none text-slate-800">{value}</p>
                      <p className="text-[11px] text-slate-500">{label}</p>
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={() => navigate('/perfil')}>
                  Ver mi perfil
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Buscador */}
      <section className="mx-auto max-w-[1800px] px-4 py-4 sm:px-8">
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-900/5 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
          <IconField icon={IconSearch} type="text" placeholder="Ej: Odontólogo, Psicólogo, RIPS…" />
          <div className="relative">
            <IconMapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20 sm:w-56">
              <option>Todas las ciudades</option>
              <option>Medellín</option>
              <option>Medellín</option>
              <option>Cali</option>
              <option>Barranquilla</option>
              <option>Bucaramanga</option>
            </select>
          </div>
          <div className="relative">
            <IconStethoscope className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20 sm:w-56">
              <option>Todas las divisiones</option>
              <option>Odontología</option>
              <option>Salud Mental</option>
              <option>Medicina General</option>
              <option>Enfermería</option>
              <option>Administrativa</option>
            </select>
          </div>
          <Button size="lg">
            <IconSearch className="h-4 w-4" />
            Buscar
          </Button>
        </div>
        <div className="mt-5 flex flex-wrap gap-8">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0ca3c5]/10 text-[#0ca3c5]">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-lg font-extrabold leading-none text-slate-800">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
      </section>

      {/* Filtros */}
      <section className="mx-auto max-w-[1800px] px-4 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <FilterPill label="Tipo de Jornada" isOpen={openFilter === 'jornada'} onToggle={() => toggleFilter('jornada')}>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">Tipo de Jornada</p>
            <div className="flex flex-col gap-2.5">
              {JOB_TYPE_FILTERS.map((f) => (
                <FilterCheckbox key={f.label} {...f} />
              ))}
            </div>
          </FilterPill>

          <FilterPill label="Modalidad" isOpen={openFilter === 'modalidad'} onToggle={() => toggleFilter('modalidad')}>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">Modalidad Asistencial</p>
            <div className="flex flex-col gap-2.5">
              {MODALITY_FILTERS.map((f) => (
                <FilterCheckbox key={f.label} {...f} />
              ))}
            </div>
          </FilterPill>

          <FilterPill label="Salario mínimo" isOpen={openFilter === 'salario'} onToggle={() => toggleFilter('salario')}>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">Rango Salarial Mensual</p>
            <div className="flex flex-col gap-2.5">
              {SALARY_FILTERS.map((label, i) => (
                <label key={label} className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="radio"
                    name="salaryRange"
                    defaultChecked={i === 1}
                    className="h-4 w-4 border-slate-300 text-[#1654a3] focus:ring-[#1654a3]/30"
                  />
                  {label}
                </label>
              ))}
            </div>
          </FilterPill>

          <FilterPill label="Experiencia" isOpen={openFilter === 'experiencia'} onToggle={() => toggleFilter('experiencia')}>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">Experiencia Mínima</p>
            <div className="flex flex-col gap-2.5">
              {EXPERIENCE_FILTERS.map((f) => (
                <FilterCheckbox key={f.label} {...f} />
              ))}
            </div>
          </FilterPill>

          <button type="button" className="ml-auto text-xs font-semibold text-[#1654a3] hover:underline">
            Limpiar filtros
          </button>
        </div>
      </section>

      {/* Alerta de empleo */}
      <section className="mx-auto max-w-[1800px] px-4 pt-3 sm:px-8">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#0ca3c5]/20 bg-[#0ca3c5]/5 px-4 py-2.5">
          <IconBell className="h-4 w-4 shrink-0 text-[#0ca3c5]" />
          <p className="flex-1 text-xs text-slate-600">
            Recibe vacantes compatibles con tu perfil por WhatsApp o correo institucional.
          </p>
          <IconField icon={IconMail} type="email" placeholder="Ingresa tu correo" size="sm" focusColor="teal" className="w-56" />
          <Button variant="teal" size="sm">
            Activar Alerta
          </Button>
        </div>
      </section>

      {/* Listado + detalle */}
      <section className="mx-auto max-w-[1800px] px-4 py-3 sm:px-8">
        <p className="mb-2 text-sm text-slate-500">
          Mostrando {JOBS.length} convocatorias activas con postulación directa
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[6fr_4fr] lg:items-start">
          {/* Lista de convocatorias */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div>
              {JOBS.map((job) => (
                <JobListItem
                  key={job.id}
                  job={job}
                  active={job.id === selectedJob.id}
                  onSelect={() => navigate(`/vacantes/${job.id}`)}
                />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconChevronLeft className="h-4 w-4" />
                Anterior
              </button>

              <div className="flex items-center gap-1 text-sm">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`h-8 w-8 rounded-lg font-semibold ${
                      page === n ? 'bg-[#1654a3] text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <span className="px-1 text-slate-400">…</span>
                <button
                  type="button"
                  onClick={() => setPage(totalPages)}
                  className={`h-8 w-8 rounded-lg font-semibold ${
                    page === totalPages ? 'bg-[#1654a3] text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {totalPages}
                </button>
              </div>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
                <IconChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Detalle de la convocatoria seleccionada */}
          <div className="lg:sticky lg:top-3 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto">
            <JobDetailPanel job={selectedJob} />
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="bg-[#eef2f7] py-6">
        <div className="mx-auto max-w-[1800px] px-4 text-center sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0ca3c5]">Líneas de Atención Especializada</p>
          <h2 className="mt-1 text-lg font-extrabold text-slate-800">Desarrolla tu vocación asistencial</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
            {SPECIALTIES.map(({ icon: Icon, title, linkLabel }) => (
              <a
                key={title}
                href="#"
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1654a3]/10 text-[#1654a3]">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-extrabold text-slate-800">{title}</h3>
                  <p className="truncate text-xs text-slate-500">{linkLabel}</p>
                </div>
                <IconArrowRight className="h-3.5 w-3.5 shrink-0 text-[#1654a3]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-4 py-10 sm:px-8"
        style={{ background: `linear-gradient(135deg, ${BRAND.blue} 0%, #0f3d78 100%)` }}
      >
        <div className="mx-auto flex max-w-[1800px] flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            ¿No encuentras la vacante específica para tu perfil?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="white" onClick={() => navigate('/login')}>
              Registrar mi Hoja de Vida
            </Button>
            <Button variant="whiteOutline" onClick={() => navigate('/login')}>
              Consultar Estado de Selección
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
