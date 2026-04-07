import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function BackgroundMesh() {
  const reduced = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 75%)',
        }}
      />
      {!reduced && (
        <>
          <motion.div
            className="absolute -left-1/4 top-1/4 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-gradient-to-br from-amber-500/20 via-yellow-600/10 to-transparent blur-[100px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-1/4 bottom-0 h-[min(70vw,480px)] w-[min(70vw,480px)] rounded-full bg-gradient-to-tl from-yellow-400/15 via-amber-700/10 to-transparent blur-[110px]"
            animate={{ x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD700]/5 blur-[90px]"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
      {reduced && (
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]" />
      )}
    </div>
  )
}
