import { motion, useSpring, useTransform } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** Sits directly under the fixed navbar (h-16 = 4rem). */
export function ScrollProgress() {
  const raw = useScrollProgress()
  const reduced = useReducedMotion()
  const smooth = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.35 })
  const scaleX = useTransform(smooth, [0, 1], [0, 1])

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-16 z-[90] h-0.5 bg-black/50">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-yellow-600 via-[#FFD700] to-yellow-200 shadow-[0_0_16px_rgba(250,204,21,0.6),0_0_32px_rgba(234,179,8,0.25)]"
        style={{ scaleX: reduced ? raw : scaleX }}
      />
    </div>
  )
}
