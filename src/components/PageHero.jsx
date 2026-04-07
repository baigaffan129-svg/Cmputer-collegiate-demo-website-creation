import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function PageHero({ kicker, title, subtitle, children, className = '', compact = false }) {
  const reduced = useReducedMotion()

  return (
    <section
      className={`relative overflow-hidden px-4 md:px-8 ${compact ? 'py-10 md:py-14' : 'py-16 md:py-24'} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_-20%,rgba(250,204,21,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-gradient-to-bl from-amber-400/20 to-transparent blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-yellow-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute left-8 top-24 h-px w-24 bg-gradient-to-r from-[#FFD700]/80 to-transparent md:left-12" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/35 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-300/95 shadow-[0_0_20px_rgba(234,179,8,0.15)] backdrop-blur-md">
            <span className="h-1 w-1 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]" />
            {kicker}
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle != null && subtitle !== '' && (
            <div className="mt-6 text-lg leading-relaxed text-yellow-300 md:text-xl">{subtitle}</div>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  )
}
