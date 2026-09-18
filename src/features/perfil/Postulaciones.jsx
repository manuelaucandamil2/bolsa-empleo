import { useNavigate } from 'react-router-dom'
import { useApp } from '../../app/AppContext'
import AccountPageShell from '../../components/AccountPageShell'
import Button from '../../components/Button'
import { JOBS, APPLICATION_STAGES } from '../vacantes/jobsData'
import { IconCheck, IconMapPin, IconEye, IconBriefcase } from '../../components/icons'

export default function Postulaciones() {
  const navigate = useNavigate()
  const { applications } = useApp()

  return (
    <AccountPageShell
      title="Mis Postulaciones"
      subtitle={
        applications.length === 0
          ? 'Aún no tienes procesos activos'
          : `${applications.length} ${applications.length === 1 ? 'proceso activo' : 'procesos activos'}`
      }
    >
      {applications.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <IconBriefcase className="h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-500">Aún no te has postulado a ninguna vacante.</p>
          <Button size="sm" onClick={() => navigate('/')}>
            Explorar vacantes
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => {
            const job = JOBS.find((j) => j.id === app.jobId)
            const stageIndex = Math.max(APPLICATION_STAGES.indexOf(app.etapa), 0)

            return (
              <div key={app.jobId ?? app.vacante} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">{app.vacante}</h2>
                    {job && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <IconMapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-slate-400">Postulado el {app.fecha}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-[#0ca3c5]/10 px-2.5 py-1 text-xs font-bold text-[#0ca3c5]">
                      {app.estado}
                    </span>
                    {job && (
                      <Button size="sm" variant="outline" onClick={() => navigate(`/vacantes/${job.id}`)}>
                        <IconEye className="h-3.5 w-3.5" />
                        Ver vacante
                      </Button>
                    )}
                  </div>
                </div>

                <ol className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4">
                  {APPLICATION_STAGES.map((stage, i) => (
                    <li key={stage} className="flex items-center gap-1.5 text-xs">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          i < stageIndex
                            ? 'bg-[#0ca3c5] text-white'
                            : i === stageIndex
                              ? 'bg-[#1654a3] text-white'
                              : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {i < stageIndex ? <IconCheck className="h-3 w-3" /> : i + 1}
                      </span>
                      <span className={i <= stageIndex ? 'font-semibold text-slate-700' : 'text-slate-400'}>
                        {stage}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )
          })}
        </div>
      )}
    </AccountPageShell>
  )
}
