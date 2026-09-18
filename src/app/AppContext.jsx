import { createContext, useContext, useState } from 'react'
import { APPLICATIONS as INITIAL_APPLICATIONS } from '../features/perfil/applicationsData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [session, setSession] = useState(null)
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS)
  const [profile, setProfile] = useState(null)
  const [savedJobs, setSavedJobs] = useState([])

  function login(role) {
    setSession({ role })
  }

  function logout() {
    setSession(null)
  }

  function registerProfile(data) {
    setProfile(data)
  }

  function updateProfile(patch) {
    setProfile((prev) => ({ ...(prev ?? {}), ...patch }))
  }

  function hasApplied(jobId) {
    return applications.some((a) => a.jobId === jobId)
  }

  function isJobSaved(jobId) {
    return savedJobs.some((j) => j.id === jobId)
  }

  function toggleSaveJob(job) {
    setSavedJobs((prev) =>
      prev.some((j) => j.id === job.id) ? prev.filter((j) => j.id !== job.id) : [job, ...prev],
    )
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

  const value = {
    session,
    login,
    logout,
    applications,
    hasApplied,
    applyToJob,
    profile,
    registerProfile,
    updateProfile,
    savedJobs,
    isJobSaved,
    toggleSaveJob,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp debe usarse dentro de <AppProvider>')
  }
  return ctx
}
