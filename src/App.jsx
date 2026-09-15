import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

function App() {
  const [view, setView] = useState('login')

  if (view === 'register') {
    return <Register onBackToLogin={() => setView('login')} />
  }

  return <Login onCreateAccount={() => setView('register')} />
}

export default App
