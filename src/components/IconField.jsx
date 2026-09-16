const SIZE_STYLES = {
  md: { input: 'py-2.5 text-sm', iconPos: 'left-3.5', icon: 'h-4 w-4', padWithIcon: 'pl-10', padNoIcon: 'pl-3.5' },
  sm: { input: 'py-2 text-xs', iconPos: 'left-3', icon: 'h-3.5 w-3.5', padWithIcon: 'pl-8', padNoIcon: 'pl-3' },
}

const FOCUS_STYLES = {
  blue: 'focus:border-[#1654a3] focus:ring-[#1654a3]/20',
  teal: 'focus:border-[#0ca3c5] focus:ring-[#0ca3c5]/20',
}

export default function IconField({ icon: Icon, rightElement, size = 'md', focusColor = 'blue', className = '', ...props }) {
  const s = SIZE_STYLES[size]

  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <Icon className={`pointer-events-none absolute ${s.iconPos} top-1/2 ${s.icon} -translate-y-1/2 text-slate-400`} />
      )}
      <input
        {...props}
        className={`w-full rounded-lg border border-slate-300 bg-white ${s.input} text-slate-700 placeholder:text-slate-400 outline-none transition-colors ${FOCUS_STYLES[focusColor]} ${
          Icon ? s.padWithIcon : s.padNoIcon
        } ${rightElement ? 'pr-10' : 'pr-3.5'}`}
      />
      {rightElement}
    </div>
  )
}
