import { useNavigate } from 'react-router-dom'
import { useApp } from '../../app/AppContext'
import AccountPageShell from '../../components/AccountPageShell'
import JobListItem from '../vacantes/JobListItem'
import { IconBookmark } from '../../components/icons'

export default function Guardados() {
  const navigate = useNavigate()
  const { savedJobs } = useApp()

  return (
    <AccountPageShell
      title="Vacantes Guardadas"
      subtitle={
        savedJobs.length === 0
          ? 'Aún no has guardado ninguna vacante'
          : `${savedJobs.length} ${savedJobs.length === 1 ? 'vacante guardada' : 'vacantes guardadas'}`
      }
    >
      {savedJobs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <IconBookmark className="h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-500">
            Usa el ícono de marcador en cualquier convocatoria para guardarla y verla aquí después.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {savedJobs.map((job) => (
            <JobListItem key={job.id} job={job} active={false} onSelect={() => navigate(`/vacantes/${job.id}`)} />
          ))}
        </div>
      )}
    </AccountPageShell>
  )
}
