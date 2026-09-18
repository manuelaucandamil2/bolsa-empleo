import { useNavigate } from 'react-router-dom'
import { useApp } from '../../app/AppContext'
import AccountPageShell from '../../components/AccountPageShell'
import JobListItem from '../vacantes/JobListItem'
import { JOBS } from '../vacantes/jobsData'

function matchesSpecialty(job, specialty) {
  if (!specialty) return false
  const keyword = specialty.split(' ')[0].toLowerCase()
  return job.category.toLowerCase().includes(keyword) || job.title.toLowerCase().includes(keyword)
}

export default function Sugeridos() {
  const navigate = useNavigate()
  const { profile, hasApplied } = useApp()

  const matches = JOBS.filter((job) => matchesSpecialty(job, profile?.specialty))
  const suggested = (matches.length > 0 ? matches : JOBS).filter((job) => !hasApplied(job.id))

  return (
    <AccountPageShell
      title="Vacantes Sugeridas"
      subtitle={
        matches.length > 0
          ? `Según tu cargo/especialidad: ${profile.specialty}`
          : 'Según las convocatorias más recientes'
      }
    >
      {suggested.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            ¡Ya te has postulado a todas las vacantes disponibles para tu perfil!
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {suggested.map((job) => (
            <JobListItem key={job.id} job={job} active={false} onSelect={() => navigate(`/vacantes/${job.id}`)} />
          ))}
        </div>
      )}
    </AccountPageShell>
  )
}
