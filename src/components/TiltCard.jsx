import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 260, damping: 24 })
  const sry = useSpring(ry, { stiffness: 260, damping: 24 })
  const rotateX = useTransform(sry, [-20, 20], [8, -8])
  const rotateY = useTransform(srx, [-20, 20], [-8, 8])

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rx.set(px * 20)
    ry.set(py * 20)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}
