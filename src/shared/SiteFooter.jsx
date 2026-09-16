import { IconShieldCheck, IconMail, IconPhone, IconClock } from './icons'

const FOOTER_LINKS = [
  'Sedes y Cobertura',
  'Canales de Atención',
  'Política de Privacidad y Tratamiento de Datos',
  'Línea Ética y Transparencia',
  'Trabaja con Nosotros',
]

export default function SiteFooter() {
  return (
    <footer className="px-4 py-10 text-slate-300 sm:px-8" style={{ background: '#0c2340' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-1.5 text-lg font-extrabold leading-none text-white">
            <span>Preventiva Salud IPS</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Institución Prestadora de Servicios de Salud comprometida con la excelencia asistencial, la
            humanización del cuidado y el desarrollo profesional del talento médico colombiano.
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <IconShieldCheck className="h-3.5 w-3.5 text-[#0ca3c5]" />
            Vigilado Superintendencia Nacional de Salud
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Enlaces Institucionales</h3>
          <ul className="mt-3 flex flex-col gap-2 text-xs">
            {FOOTER_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="text-slate-400 hover:text-white hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Canal Gestión de Talento</h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <IconMail className="h-3.5 w-3.5 shrink-0 text-[#0ca3c5]" />
              seleccion@preventivasalud.com.co
            </li>
            <li className="flex items-center gap-2">
              <IconPhone className="h-3.5 w-3.5 shrink-0 text-[#0ca3c5]" />
              (601) 745 0000 Ext. 104 - 108
            </li>
            <li className="flex items-center gap-2">
              <IconClock className="h-3.5 w-3.5 shrink-0 text-[#0ca3c5]" />
              Lunes a Viernes: 7:00 am - 5:00 pm
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Preventiva Salud IPS. Todos los derechos reservados. Vigilado Supersalud.</span>
        <span>Portal Oficial de Empleo · Versión 3.2.0</span>
      </div>
    </footer>
  )
}
