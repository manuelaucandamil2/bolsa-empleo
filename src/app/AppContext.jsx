import { createContext, useContext, useEffect, useState } from 'react'
import { APPLICATIONS as INITIAL_APPLICATIONS } from '../features/perfil/applicationsData'
import { api } from './api'

const AppContext = createContext(null)
const TOKEN_KEY = 'bolsa_empleo_token'

function userToProfile(user) {
  const profile = { ...user }
  delete profile.role
  return profile
}

export function AppProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS)
  const [savedJobs, setSavedJobs] = useState([])

  // Al cargar la app, si hay un token guardado se valida contra el backend
  // para restaurar la sesión (ej. después de refrescar la página).
  useEffect(() => {
    if (!token) return
    api
      .me(token)
      .then((user) => {
        setSession({ role: user.role })
        setProfile(userToProfile(user))
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function applyAuthResult({ user, token: newToken }) {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
    setSession({ role: user.role })
    setProfile(userToProfile(user))
  }

  async function login(email, password) {
    const result = await api.login({ email, password })
    applyAuthResult(result)
  }

  async function register(payload) {
    const result = await api.register(payload)
    applyAuthResult(result)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setSession(null)
    setProfile(null)
  }

  // Sincronización local instantánea (ej. mientras se escribe o se elige una foto),
  // sin llamar al backend en cada cambio.
  function updateProfile(patch) {
    setProfile((prev) => ({ ...(prev ?? {}), ...patch }))
  }

  // Persistencia explícita contra el backend (ej. al presionar "Guardar cambios").
  async function saveProfile(patch) {
    const updated = await api.updatePerfil(token, patch)
    setProfile((prev) => ({ ...(prev ?? {}), ...updated }))
    return updated
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
    token,
    login,
    register,
    logout,
    applications,
    hasApplied,
    applyToJob,
    profile,
    updateProfile,
    saveProfile,
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
