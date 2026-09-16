import { useState } from 'react'
import Vacantes from './features/vacantes/Vacantes'
import VacanteDetalle from './features/vacantes/VacanteDetalle'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import './App.css'

function App() {
  const [view, setView] = useState('vacantes')
  const [selectedJob, setSelectedJob] = useState(null)

  if (view === 'login') {
    return <Login onCreateAccount={() => setView('register')} onBackToJobs={() => setView('vacantes')} />
  }

  if (view === 'register') {
    return <Register onBackToLogin={() => setView('login')} />
  }

  if (view === 'detalle') {
    return (
      <VacanteDetalle
        job={selectedJob}
        onBack={() => setView('vacantes')}
        onLogin={() => setView('login')}
      />
    )
  }

  return (
    <Vacantes
      onLogin={() => setView('login')}
      onHome={() => setView('vacantes')}
      onSelectJob={(job) => {
        setSelectedJob(job)
        setView('detalle')
      }}
    />
  )
}

export default App
