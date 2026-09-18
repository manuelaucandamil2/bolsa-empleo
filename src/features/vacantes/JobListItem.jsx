import { useApp } from '../../app/AppContext'
import { IconMapPin, IconCheck, IconBookmark } from '../../components/icons'

export default function JobListItem({ job, active, onSelect }) {
  const { hasApplied, isJobSaved, toggleSaveJob } = useApp()
  const applied = hasApplied(job.id)
  const saved = isJobSaved(job.id)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      className={`flex w-full cursor-pointer flex-col gap-2 border-b border-slate-100 px-5 py-5 text-left transition-colors last:border-0 ${
        active ? 'bg-[#1654a3]/5' : 'bg-white hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-slate-400">{job.badge.text}</span>
        <div className="flex items-center gap-2">
          {applied && (
            <span className="flex items-center gap-1 rounded-md bg-[#0ca3c5]/10 px-2 py-1 text-xs font-bold text-[#0ca3c5]">
              <IconCheck className="h-3.5 w-3.5" />
              Postulado
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleSaveJob(job)
            }}
            className={`rounded-md p-1.5 transition-colors ${
              saved ? 'text-[#ee7128]' : 'text-slate-300 hover:text-slate-500'
            }`}
            aria-label={saved ? 'Quitar de guardados' : 'Guardar vacante'}
            aria-pressed={saved}
          >
            <IconBookmark className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      <h3 className={`text-base font-bold leading-snug ${active ? 'text-[#1654a3]' : 'text-slate-800'}`}>
        {job.title}
      </h3>
      <p className="text-sm text-slate-500">
        {job.category} · {job.schedule}
      </p>
      <p className="text-base font-extrabold text-slate-700">{job.salary}</p>
      <p className="flex items-center gap-1.5 text-sm text-slate-400">
        <IconMapPin className="h-3.5 w-3.5 shrink-0" />
        {job.location}
      </p>
    </div>
  )
}
