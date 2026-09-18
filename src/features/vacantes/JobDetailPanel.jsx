import Button from '../../components/Button'
import { useApp } from '../../app/AppContext'
import { APPLICATION_STAGES, BADGE_STYLES } from './jobsData'
import { IconMapPin, IconClock, IconBuilding, IconCheck, IconUserPlus, IconBookmark } from '../../components/icons'

export default function JobDetailPanel({ job }) {
  const { hasApplied, applyToJob, isJobSaved, toggleSaveJob } = useApp()

  if (!job) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Selecciona una convocatoria de la lista para ver el detalle.
      </div>
    )
  }

  const applied = hasApplied(job.id)
  const saved = isJobSaved(job.id)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-[#1654a3]/10 px-2.5 py-1 text-xs font-bold text-[#1654a3]">
            {job.category}
          </span>
          <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${BADGE_STYLES[job.badge.tone]}`}>
            {job.badge.text}
          </span>
        </div>
        <button
          type="button"
          onClick={() => toggleSaveJob(job)}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
            saved ? 'bg-[#ee7128]/10 text-[#ee7128]' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
          }`}
          aria-pressed={saved}
        >
          <IconBookmark className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} />
          {saved ? 'Guardada' : 'Guardar'}
        </button>
      </div>

      <h1 className="text-xl font-extrabold text-slate-800 sm:text-2xl">{job.title}</h1>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-500">
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

      {/* Acción principal */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#f5f8fc] p-4">
        <div>
          <p className="text-[11px] font-medium text-slate-400">{job.salaryLabel}</p>
          <p className="text-lg font-extrabold text-slate-800">{job.salary}</p>
        </div>
        {!applied ? (
          <Button onClick={() => applyToJob(job)}>
            <IconUserPlus className="h-4 w-4" />
            Postularme a esta vacante
          </Button>
        ) : (
          <span className="flex items-center gap-1.5 rounded-md bg-[#0ca3c5]/10 px-3 py-2 text-sm font-bold text-[#0b8fac]">
            <IconCheck className="h-4 w-4" />
            Ya postulado
          </span>
        )}
      </div>

      {applied && (
        <div className="mt-5 rounded-lg border border-[#0ca3c5]/30 bg-[#0ca3c5]/5 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-[#0b8fac]">
            <IconCheck className="h-4 w-4 shrink-0" />
            ¡Postulación enviada con éxito!
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            Podrás ver el avance de tu proceso desde tu perfil de candidato.
          </p>
          <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {APPLICATION_STAGES.map((stage, i) => (
              <li key={stage} className="flex items-center gap-1.5 text-xs">
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
      {!applied && (
        <p className="mt-2 text-center text-[11px] text-slate-400">
          Necesitas una cuenta de candidato para postularte.
        </p>
      )}

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
  )
}
