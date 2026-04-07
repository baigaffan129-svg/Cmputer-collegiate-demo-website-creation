/** Gradient border + inner glass — premium card chrome */
export function GlowFrame({ children, className = '', innerClassName = '' }) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-[#FFD700]/45 via-amber-600/25 to-white/15 p-[1px] shadow-[0_0_50px_rgba(234,179,8,0.12)] ${className}`}
    >
      <div
        className={`h-full rounded-[calc(1.5rem-1px)] bg-zinc-950/85 backdrop-blur-2xl ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  )
}
