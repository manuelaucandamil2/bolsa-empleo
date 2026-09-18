import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './app/AppContext'
import ScrollToTop from './app/ScrollToTop'
import Vacantes from './features/vacantes/Vacantes'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Perfil from './features/perfil/Perfil'
import Postulaciones from './features/perfil/Postulaciones'
import Sugeridos from './features/perfil/Sugeridos'
import Guardados from './features/perfil/Guardados'
import Configuracion from './features/perfil/Configuracion'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Vacantes />} />
          <Route path="/vacantes/:jobId" element={<Vacantes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/postulaciones" element={<Postulaciones />} />
          <Route path="/sugeridos" element={<Sugeridos />} />
          <Route path="/guardados" element={<Guardados />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
