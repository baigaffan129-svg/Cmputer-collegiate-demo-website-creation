import { animate, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function AnimatedCounter({ value, suffix = '', duration = 1.6 }) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const count = useMotionValue(0)

  useMotionValueEvent(count, 'change', (v) => setDisplay(Math.round(v)))

  useEffect(() => {
    count.set(0)
    if (reduced) {
      count.set(value)
      setDisplay(value)
      return undefined
    }
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [value, duration, count, reduced])

  return (
    <span className="tabular-nums">
      {display}
      {suffix ? <span className="text-[#FFD700]">{suffix}</span> : null}
    </span>
  )
}
