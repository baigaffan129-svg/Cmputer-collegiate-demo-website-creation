import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function MagneticButton({
  children,
  className = '',
  as: Component = motion.button,
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 22 })
  const sy = useSpring(y, { stiffness: 300, damping: 22 })

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    x.set(dx)
    y.set(dy)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Component
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}
