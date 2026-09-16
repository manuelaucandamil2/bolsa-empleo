import Button from '../../components/Button'
import { IconMapPin, IconClock, IconBuilding, IconCheck } from '../../components/icons'
import { BADGE_STYLES } from './jobsData'
import { useApp } from '../../app/AppContext'

export default function JobCard({ job, onSelect }) {
  const { hasApplied } = useApp()
  const applied = hasApplied(job.id)

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-md bg-[#1654a3]/10 px-2.5 py-1 text-xs font-bold text-[#1654a3]">
          {job.category}
        </span>
        {applied ? (
          <span className="flex items-center gap-1 rounded-md bg-[#0ca3c5]/10 px-2.5 py-1 text-xs font-bold text-[#0ca3c5]">
            <IconCheck className="h-3 w-3" />
            Ya postulado
          </span>
        ) : (
          <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${BADGE_STYLES[job.badge.tone]}`}>
            {job.badge.text}
          </span>
        )}
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
        <Button
          onClick={onSelect}
          variant={job.buttonTone === 'dark' ? 'primaryDark' : 'primary'}
          size="sm"
          className="shrink-0"
        >
          {applied ? 'Ver mi postulación' : 'Ver detalle y postularme'}
        </Button>
      </div>
    </div>
  )
}
