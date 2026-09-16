import { useState } from 'react'
import { BRAND } from '../../shared/brand'
import SiteHeader from '../../shared/SiteHeader'
import SiteFooter from '../../shared/SiteFooter'
import {
  IconUsers,
  IconBriefcase,
  IconSearch,
  IconMapPin,
  IconClock,
  IconBuilding,
  IconChevronLeft,
  IconChevronRight,
  IconArrowRight,
  IconTooth,
  IconBrain,
  IconStethoscope,
  IconGraduationCap,
  IconHeart,
  IconPercent,
  IconFileCheck,
  IconBell,
  IconSmile,
  IconAward,
  IconMail,
} from '../../shared/icons'

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

const JOBS = [
  {
    id: 'odontologo-general-norte',
    category: 'Odontología IPS',
    badge: { text: 'Publicado hoy', tone: 'neutral' },
    title: 'Odontólogo(a) General - Sede Norte',
    location: 'Bogotá D.C. (Sede Pepe Sierra)',
    schedule: 'Término indefinido',
    modality: 'Presencial',
    description:
      'Requisitos: Registro RETHUS vigente, tarjeta profesional, experiencia mínima de 2 años en operativa, prótesis fija y…',
    responsibilities: [
      'Atención odontológica general a pacientes adscritos al plan de salud.',
      'Diagnóstico, tratamiento y seguimiento de procedimientos de operatoria y prótesis fija.',
      'Registro clínico conforme a la normativa vigente de historia clínica.',
    ],
    requirements: [
      'Título profesional en Odontología con tarjeta profesional vigente.',
      'Registro RETHUS activo.',
      'Mínimo 2 años de experiencia en consulta general.',
      'Disponibilidad para laborar en Sede Norte, Bogotá.',
    ],
    tags: ['Bono bienestar', 'Póliza de Salud', 'Capacitación'],
    salaryLabel: 'Asignación Salarial',
    salary: '$5.200.000 COP',
    buttonTone: 'blue',
  },
  {
    id: 'psicologo-clinico-preventivamente',
    category: 'Salud Mental - Preventivamente',
    badge: { text: 'Urgente', tone: 'urgent' },
    title: 'Psicólogo(a) Clínico - Clínica Preventivamente',
    location: 'Medellín (Sede El Poblado)',
    schedule: 'Tiempo Completo',
    modality: 'Presencial',
    description:
      'Atención terapéutica individual y grupal, elaboración de planes de intervención cognitivo-conductual. Tarjeta profesional al día…',
    responsibilities: [
      'Atención terapéutica individual y grupal a pacientes remitidos.',
      'Elaboración de planes de intervención cognitivo-conductual.',
      'Participación en juntas clínicas interdisciplinarias.',
    ],
    requirements: [
      'Título profesional en Psicología con énfasis clínico.',
      'Tarjeta profesional vigente.',
      'Experiencia mínima de 1 año en atención clínica.',
      'Disponibilidad de tiempo completo en Sede El Poblado, Medellín.',
    ],
    tags: ['Horario Flexible', 'Supervisión Clínica'],
    salaryLabel: 'Remuneración Fija',
    salary: '$4.500.000 COP',
    buttonTone: 'dark',
  },
  {
    id: 'medico-general-consulta-externa',
    category: 'Medicina General',
    badge: { text: '3 Vacantes', tone: 'neutral' },
    title: 'Médico(a) General de Consulta Externa',
    location: 'Cali (Sede San Fernando)',
    schedule: 'Turnos Rotativos',
    modality: 'Contrato Directo',
    description:
      'Consulta programada y prioritaria para usuarios adscritos al plan complementario. Formación médica continuada certificada y…',
    responsibilities: [
      'Consulta médica programada y prioritaria a usuarios del plan complementario.',
      'Formulación y seguimiento de tratamientos según guías clínicas vigentes.',
      'Remisión oportuna a especialidades cuando se requiera.',
    ],
    requirements: [
      'Título profesional en Medicina con Registro Médico vigente.',
      'Disponibilidad para turnos rotativos.',
      'Deseable experiencia previa en consulta externa.',
      'RCP básico vigente.',
    ],
    tags: ['Póliza Jurídica 100%', 'Alimentación Sede'],
    salaryLabel: 'Salario base + recargos',
    salary: '$6.800.000 COP',
    buttonTone: 'blue',
  },
  {
    id: 'jefe-enfermeria-coordinacion',
    category: 'Enfermería Asistencial',
    badge: { text: 'Hace 2 días', tone: 'neutral' },
    title: 'Jefe de Enfermería / Coordinación Asistencial',
    location: 'Barranquilla (Sede Prado)',
    schedule: 'Horario Fijo Diurno',
    modality: 'Presencial',
    description:
      'Supervisión del equipo de auxiliares, gestión de inventarios de bioseguridad, administración segura de medicamentos y…',
    responsibilities: [
      'Supervisión del equipo de auxiliares de enfermería.',
      'Gestión de inventarios de bioseguridad e insumos médicos.',
      'Administración segura de medicamentos conforme a protocolos institucionales.',
    ],
    requirements: [
      'Título profesional en Enfermería con tarjeta profesional vigente.',
      'Experiencia mínima de 3 años en coordinación asistencial.',
      'Conocimientos en gestión de calidad en salud.',
    ],
    tags: ['Auxilio de Movilidad', 'Convenios Educativos'],
    salaryLabel: 'Salario Integral',
    salary: '$3.800.000 COP',
    buttonTone: 'blue',
  },
  {
    id: 'auxiliar-facturacion-ips',
    category: 'Administración en Salud',
    badge: { text: 'Activa', tone: 'active' },
    title: 'Auxiliar Administrativo de Facturación IPS',
    location: 'Bucaramanga (Sede Cabecera)',
    schedule: 'Lunes a Viernes',
    modality: 'Presencial',
    description:
      'Generación y validación de RIPS conforme a normativa vigente del Ministerio de Salud, radicación electrónica ante EPS y gestión…',
    responsibilities: [
      'Generación y validación de RIPS conforme a normativa del Ministerio de Salud.',
      'Radicación electrónica de cuentas ante EPS.',
      'Gestión de glosas y respuesta a requerimientos de auditoría.',
    ],
    requirements: [
      'Técnico o tecnólogo en áreas administrativas o de salud.',
      'Experiencia mínima de 1 año en facturación en salud.',
      'Manejo de herramientas ofimáticas y software de facturación.',
    ],
    tags: ['Teletrabajo 1 día/sem', 'Caja de Compensación'],
    salaryLabel: 'Salario Base Legal',
    salary: '$2.100.000 COP',
    buttonTone: 'blue',
  },
  {
    id: 'especialista-ortodoncia-ortopedia',
    category: 'Odontología Especializada',
    badge: { text: 'Cupo Prioritario', tone: 'priority' },
    title: 'Especialista en Ortodoncia y Ortopedia Maxilar',
    location: 'Bogotá D.C. (Sedes Chapinero y Suba)',
    schedule: 'Por Honorarios / Fracciones',
    modality: 'Presencial',
    description:
      'Manejo de aparatología fija, ortopedia y alineadores invisibles. Infraestructura digital de escaneo intraoral disponible en sede…',
    responsibilities: [
      'Diagnóstico y planeación de tratamientos de ortodoncia y ortopedia maxilar.',
      'Manejo de aparatología fija y alineadores invisibles.',
      'Uso de escaneo intraoral 3D para seguimiento de tratamientos.',
    ],
    requirements: [
      'Especialización en Ortodoncia y Ortopedia Maxilar.',
      'Tarjeta profesional y RETHUS vigentes.',
      'Experiencia mínima de 2 años como especialista.',
      'Disponibilidad por honorarios/fracciones en sedes Chapinero y Suba.',
    ],
    tags: ['Flujo Seguro Pacientes', 'Scanner 3D en Sede'],
    salaryLabel: 'Esquema Tarifario',
    salary: 'Porcentaje Competitivo',
    buttonTone: 'blue',
  },
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

const BENEFITS = [
  { icon: IconFileCheck, title: 'Estabilidad y Contrato Directo', text: 'Vinculación formal con todas las prestaciones de ley y pagos puntuales garantizados.' },
  { icon: IconGraduationCap, title: 'Educación Médica Continua', text: 'Convenios universitarios y becas parciales para posgrados y diplomados en salud.' },
  { icon: IconHeart, title: 'Programa "Cuidarte"', text: 'Atención psicológica gratuita y actividades de bienestar laboral para nuestro equipo.' },
  { icon: IconPercent, title: 'Tarifas Preferenciales', text: 'Descuentos exclusivos en odontología y servicios de salud para tu núcleo familiar.' },
]


const BADGE_STYLES = {
  neutral: 'bg-slate-100 text-slate-600',
  urgent: 'bg-[#ee7128]/10 text-[#ee7128]',
  active: 'bg-[#0ca3c5]/10 text-[#0ca3c5]',
  priority: 'bg-[#7b4c9e]/10 text-[#7b4c9e]',
}

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

function JobCard({ job, onSelect }) {
  const buttonClass =
    job.buttonTone === 'dark'
      ? 'bg-[#0f3d78] hover:bg-[#0c2f5c]'
      : 'bg-[#1654a3] hover:bg-[#134788]'

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-md bg-[#1654a3]/10 px-2.5 py-1 text-xs font-bold text-[#1654a3]">
          {job.category}
        </span>
        <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${BADGE_STYLES[job.badge.tone]}`}>
          {job.badge.text}
        </span>
      </div>

      <h3 className="text-base font-extrabold text-slate-800">{job.title}</h3>

      <div className="mt-2 flex flex-col gap-1 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <IconMapPin className="h-3.5 w-3.5 shrink-0" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <IconClock className="h-3.5 w-3.5 shrink-0" />
          {job.schedule}
        </span>
        <span className="flex items-center gap-1.5">
          <IconBuilding className="h-3.5 w-3.5 shrink-0" />
          {job.modality}
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-500">{job.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-[11px] font-medium text-slate-400">{job.salaryLabel}</p>
          <p className="text-sm font-extrabold text-slate-800">{job.salary}</p>
        </div>
        <button
          type="button"
          onClick={onSelect}
          className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold text-white transition-colors ${buttonClass}`}
        >
          Ver detalle y postularme
        </button>
      </div>
    </div>
  )
}

export default function Vacantes({ onLogin, onSelectJob, onHome }) {
  const [page, setPage] = useState(1)
  const totalPages = 8

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <SiteHeader onLogin={onLogin} onHome={onHome} />

      {/* Hero */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
          <span className="inline-block rounded-full bg-[#1654a3]/10 px-3 py-1 text-xs font-bold text-[#1654a3]">
            Convocatoria Nacional de Talento Humano en Salud 2026
          </span>
        </div>
      </section>

      {/* Buscador */}
      <section className="mx-auto -mt-6 max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-900/5 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Ej: Odontólogo, Psicólogo, RIPS…"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20"
            />
          </div>
          <div className="relative">
            <IconMapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-700 outline-none transition-colors focus:border-[#1654a3] focus:ring-2 focus:ring-[#1654a3]/20 sm:w-56">
              <option>Todas las ciudades</option>
              <option>Bogotá D.C.</option>
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
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#1654a3] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#134788]"
          >
            <IconSearch className="h-4 w-4" />
            Buscar
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-8">
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

      {/* Listado + filtros */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filtros */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-800">Filtros</h3>
                <button type="button" className="text-xs font-semibold text-[#1654a3] hover:underline">
                  Limpiar todo
                </button>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">Tipo de Jornada</p>
                  <div className="flex flex-col gap-2.5">
                    {JOB_TYPE_FILTERS.map((f) => (
                      <FilterCheckbox key={f.label} {...f} />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">Modalidad Asistencial</p>
                  <div className="flex flex-col gap-2.5">
                    {MODALITY_FILTERS.map((f) => (
                      <FilterCheckbox key={f.label} {...f} />
                    ))}
                  </div>
                </div>

                <div>
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
                </div>

                <div>
                  <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">Experiencia Mínima</p>
                  <div className="flex flex-col gap-2.5">
                    {EXPERIENCE_FILTERS.map((f) => (
                      <FilterCheckbox key={f.label} {...f} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#0ca3c5]/20 bg-[#0ca3c5]/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <IconBell className="h-4 w-4 text-[#0ca3c5]" />
                <h3 className="text-sm font-extrabold text-slate-800">Alertas de Empleo IPS</h3>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-500">
                Recibe vacantes compatibles en tu WhatsApp o correo institucional.
              </p>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <IconMail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0ca3c5] focus:ring-2 focus:ring-[#0ca3c5]/20"
                  />
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-[#0ca3c5] py-2 text-xs font-bold text-white transition-colors hover:bg-[#0b8fac]"
                >
                  Activar Alerta
                </button>
              </div>
            </div>
          </aside>

          {/* Resultados */}
          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Convocatorias Vigentes</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Mostrando {JOBS.length} convocatorias activas con postulación directa
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                Ordenar por:
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 outline-none focus:border-[#1654a3]">
                  <option>Más recientes</option>
                  <option>Mejor salario</option>
                  <option>Más cercana</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {JOBS.map((job) => (
                <JobCard key={job.id} job={job} onSelect={() => onSelectJob(job)} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
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
        </div>
      </section>

      {/* Especialidades */}
      <section className="bg-[#eef2f7] py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0ca3c5]">Líneas de Atención Especializada</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">Desarrolla tu vocación asistencial</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
            Preventiva Salud IPS integra tres pilares asistenciales para ofrecer una experiencia integral de
            bienestar a miles de familias colombianas.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-3">
            {SPECIALTIES.map(({ icon: Icon, title, description, linkLabel }) => (
              <div key={title} className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1654a3]/10 text-[#1654a3]">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-slate-800">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{description}</p>
                <a href="#" className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-sm font-bold text-[#1654a3] hover:underline">
                  {linkLabel}
                  <IconArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0ca3c5]">Cultura de Cuidado Institucional</p>
        <h2 className="mt-2 max-w-xl text-2xl font-extrabold text-slate-800 sm:text-3xl">
          Beneficios diseñados para tu bienestar integral
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
          Sabemos que para cuidar de otros primero debemos cuidar a nuestro equipo. En Preventiva Salud IPS
          reconocemos tu vocación médica con un paquete de valor centrado en las personas.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ee7128]/10 text-[#ee7128]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div
              className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl text-white"
              style={{ background: `linear-gradient(150deg, ${BRAND.orange} 0%, ${BRAND.blue} 100%)` }}
            >
              <IconUsers className="h-20 w-20 opacity-30" />
            </div>
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1.5 text-[11px] font-bold text-slate-800 shadow-md">
              <IconAward className="h-3.5 w-3.5 text-[#ee7128]" />
              Certificación GPTW 2026
            </span>
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 px-3 py-2 shadow-md backdrop-blur-sm">
              <p className="text-xs font-bold text-slate-800">Lugar destacado para trabajar en el sector salud en Colombia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-4 py-10 sm:px-8"
        style={{ background: `linear-gradient(135deg, ${BRAND.blue} 0%, #0f3d78 100%)` }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            ¿No encuentras la vacante específica para tu perfil?
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onLogin}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#1654a3] transition-colors hover:bg-blue-50"
            >
              Registrar mi Hoja de Vida
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Consultar Estado de Selección
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
