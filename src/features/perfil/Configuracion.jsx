import { useState } from 'react'
import AccountPageShell from '../../components/AccountPageShell'
import Button from '../../components/Button'
import IconField from '../../components/IconField'
import { IconBell, IconLock, IconEye, IconEyeOff, IconShieldCheck, IconCheck } from '../../components/icons'

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        {description && <p className="mt-0.5 text-xs text-slate-400">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-[#1654a3]' : 'bg-slate-200'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="mb-1 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-slate-700">
        <Icon className="h-4 w-4 text-[#1654a3]" />
        {title}
      </h2>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  )
}

export default function Configuracion() {
  const [notifJobs, setNotifJobs] = useState(true)
  const [notifStatus, setNotifStatus] = useState(true)
  const [notifNewsletter, setNotifNewsletter] = useState(false)
  const [visibleToRecruiters, setVisibleToRecruiters] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    // TODO: conectar con el servicio de cuenta cuando exista backend
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <AccountPageShell title="Configuración de la Cuenta" subtitle="Administra tus notificaciones, privacidad y seguridad.">
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <SectionCard icon={IconBell} title="Notificaciones">
          <Toggle
            checked={notifJobs}
            onChange={setNotifJobs}
            label="Nuevas vacantes sugeridas"
            description="Recibe un correo cuando haya vacantes acordes a tu cargo o especialidad."
          />
          <Toggle
            checked={notifStatus}
            onChange={setNotifStatus}
            label="Estado de mis postulaciones"
            description="Avísame cuando avance una etapa de mi proceso de selección."
          />
          <Toggle
            checked={notifNewsletter}
            onChange={setNotifNewsletter}
            label="Boletín de Preventiva Salud IPS"
            description="Noticias y novedades institucionales."
          />
        </SectionCard>

        <SectionCard icon={IconShieldCheck} title="Privacidad">
          <Toggle
            checked={visibleToRecruiters}
            onChange={setVisibleToRecruiters}
            label="Perfil visible para reclutadores"
            description="Permite que Gestión Humana encuentre tu hoja de vida en búsquedas activas."
          />
        </SectionCard>

        <SectionCard icon={IconLock} title="Seguridad">
          <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
            <IconField
              icon={IconLock}
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Contraseña actual"
            />
            <IconField
              icon={IconLock}
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}
                >
                  {showPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                </button>
              }
            />
          </div>
        </SectionCard>

        <div className="flex items-center gap-3">
          <Button type="submit">Guardar cambios</Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#0ca3c5]">
              <IconCheck className="h-4 w-4" />
              Cambios guardados
            </span>
          )}
        </div>
      </form>
    </AccountPageShell>
  )
}
