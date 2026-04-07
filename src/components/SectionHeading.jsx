import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const reduced = useReducedMotion()
  const isCenter = align === 'center'

  return (
    <div
      className={`${isCenter ? 'mx-auto max-w-3xl text-center' : ''} ${className}`}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, x: isCenter ? 0 : -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className={`mb-2 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}
      >
        <span
          className={`h-px bg-gradient-to-r from-[#FFD700] to-transparent ${isCenter ? 'w-12' : 'w-10'}`}
        />
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow-400/95">
          {eyebrow}
        </p>
        {isCenter && (
          <span className="h-px w-12 bg-gradient-to-l from-[#FFD700] to-transparent" />
        )}
      </motion.div>
      <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-yellow-300 md:text-lg">{subtitle}</p>}
    </div>
  )
}
