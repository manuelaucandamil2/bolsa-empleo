import { createContext, useContext, useState } from 'react'
import { APPLICATIONS as INITIAL_APPLICATIONS } from '../features/perfil/applicationsData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [session, setSession] = useState(null)
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS)

  function login(role) {
    setSession({ role })
  }

  function logout() {
    setSession(null)
  }

  function hasApplied(jobId) {
    return applications.some((a) => a.jobId === jobId)
  }

  function applyToJob(job) {
    setApplications((prev) => {
      if (prev.some((a) => a.jobId === job.id)) return prev
      return [
        {
          jobId: job.id,
          vacante: job.title,
          fecha: new Date().toISOString().slice(0, 10),
          estado: 'En proceso',
          etapa: 'Postulación',
        },
        ...prev,
      ]
    })
  }

  const value = { session, login, logout, applications, hasApplied, applyToJob }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp debe usarse dentro de <AppProvider>')
  }
  return ctx
}
