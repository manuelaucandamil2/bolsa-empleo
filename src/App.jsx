import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './app/AppContext'
import ScrollToTop from './app/ScrollToTop'
import Vacantes from './features/vacantes/Vacantes'
import VacanteDetalle from './features/vacantes/VacanteDetalle'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Perfil from './features/perfil/Perfil'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Vacantes />} />
          <Route path="/vacantes/:jobId" element={<VacanteDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
