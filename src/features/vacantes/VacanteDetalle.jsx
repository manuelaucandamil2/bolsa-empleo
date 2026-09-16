import { useParams, useNavigate } from 'react-router-dom'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import Button from '../../components/Button'
import { useApp } from '../../app/AppContext'
import { JOBS } from './jobsData'
import {
  IconArrowLeft,
  IconMapPin,
  IconClock,
  IconBuilding,
  IconCheck,
  IconUserPlus,
} from '../../components/icons'

const APPLICATION_STAGES = [
  'Postulación',
  'Revisión de hoja de vida',
  'Entrevista',
  'Evaluaciones',
  'Validaciones',
  'Exámenes médicos',
  'Contratación',
]

const BADGE_STYLES = {
  neutral: 'bg-slate-100 text-slate-600',
  urgent: 'bg-[#ee7128]/10 text-[#ee7128]',
  active: 'bg-[#0ca3c5]/10 text-[#0ca3c5]',
  priority: 'bg-[#7b4c9e]/10 text-[#7b4c9e]',
}

export default function VacanteDetalle() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { hasApplied, applyToJob } = useApp()

  const job = JOBS.find((j) => j.id === jobId)
  const applied = job ? hasApplied(job.id) : false

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f5f8fc]">
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-8">
          <p className="text-lg font-bold text-slate-700">Esta vacante ya no está disponible.</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Volver a Vacantes Disponibles
          </Button>
        </div>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-semibold text-[#1654a3] hover:text-[#0ca3c5]"
        >
          <IconArrowLeft className="h-4 w-4" />
          Volver a Vacantes Disponibles
        </button>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          {/* Contenido principal */}
          <div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#1654a3]/10 px-2.5 py-1 text-xs font-bold text-[#1654a3]">
                  {job.category}
                </span>
                <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${BADGE_STYLES[job.badge.tone]}`}>
                  {job.badge.text}
                </span>
              </div>

              <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">{job.title}</h1>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <IconMapPin className="h-4 w-4 shrink-0 text-[#1654a3]" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconClock className="h-4 w-4 shrink-0 text-[#1654a3]" />
                  {job.schedule}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconBuilding className="h-4 w-4 shrink-0 text-[#1654a3]" />
                  {job.modality}
                </span>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-slate-600">{job.description}</p>

              <div className="mt-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-700">Funciones principales</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0ca3c5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-700">Requisitos</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {job.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0ca3c5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-700">Beneficios</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar de postulación */}
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-[11px] font-medium text-slate-400">{job.salaryLabel}</p>
            <p className="text-xl font-extrabold text-slate-800">{job.salary}</p>

            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <IconMapPin className="h-4 w-4 shrink-0 text-slate-400" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <IconClock className="h-4 w-4 shrink-0 text-slate-400" />
                {job.schedule}
              </span>
              <span className="flex items-center gap-2">
                <IconBuilding className="h-4 w-4 shrink-0 text-slate-400" />
                {job.modality}
              </span>
            </div>

            {!applied ? (
              <>
                <Button onClick={() => applyToJob(job)} size="lg" fullWidth className="mt-6">
                  <IconUserPlus className="h-4 w-4" />
                  Postularme a esta vacante
                </Button>
                <p className="mt-4 text-center text-[11px] text-slate-400">
                  Necesitas una cuenta de candidato para postularte.
                </p>
              </>
            ) : (
              <div className="mt-6 rounded-lg border border-[#0ca3c5]/30 bg-[#0ca3c5]/5 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-[#0b8fac]">
                  <IconCheck className="h-4 w-4 shrink-0" />
                  ¡Postulación enviada con éxito!
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  Podrás ver el avance de tu proceso desde tu perfil de candidato.
                </p>

                <ol className="mt-4 flex flex-col gap-2.5">
                  {APPLICATION_STAGES.map((stage, i) => (
                    <li key={stage} className="flex items-center gap-2.5 text-xs">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          i === 0 ? 'bg-[#0ca3c5] text-white' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {i === 0 ? <IconCheck className="h-3 w-3" /> : i + 1}
                      </span>
                      <span className={i === 0 ? 'font-semibold text-slate-700' : 'text-slate-400'}>{stage}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </aside>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
