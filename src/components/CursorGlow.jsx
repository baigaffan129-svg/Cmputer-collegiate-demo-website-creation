import { motion, useMotionTemplate, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function CursorGlow() {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()
  const sx = useSpring(0, { stiffness: 140, damping: 38, mass: 0.55 })
  const sy = useSpring(0, { stiffness: 140, damping: 38, mass: 0.55 })

  useEffect(() => {
    sx.set(x)
    sy.set(y)
  }, [x, y, sx, sy])

  const background = useMotionTemplate`radial-gradient(480px circle at ${sx}px ${sy}px, rgba(255,215,0,0.2), rgba(255,215,0,0.06) 35%, transparent 58%)`

  if (reduced) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[2] hidden md:block"
        style={{
          background: `radial-gradient(480px circle at ${x}px ${y}px, rgba(255,215,0,0.12), rgba(255,215,0,0.04) 40%, transparent 58%)`,
        }}
        aria-hidden
      />
    )
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[2] hidden md:block"
      style={{ background }}
      aria-hidden
    />
  )
}
