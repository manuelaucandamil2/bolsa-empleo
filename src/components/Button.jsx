const VARIANTS = {
  primary: 'bg-[#1654a3] text-white hover:bg-[#134788]',
  primaryDark: 'bg-[#0f3d78] text-white hover:bg-[#0c2f5c]',
  teal: 'bg-[#0ca3c5] text-white hover:bg-[#0b8fac]',
  accentOutline: 'border border-[#ee7128] text-[#ee7128] hover:bg-[#ee7128]/5',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
  white: 'bg-white text-[#1654a3] hover:bg-blue-50',
  whiteOutline: 'border border-white/40 text-white hover:bg-white/10',
}

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      {...props}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-bold shadow-sm transition-colors',
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}
