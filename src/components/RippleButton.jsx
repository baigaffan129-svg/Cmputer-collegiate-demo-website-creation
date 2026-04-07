import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

export function RippleButton({ children, className = '', type = 'button', ...props }) {
  const ref = useRef(null)
  const [ripples, setRipples] = useState([])

  const addRipple = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const size = Math.max(r.width, r.height)
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`
    const x = e.clientX - r.left - size / 2
    const y = e.clientY - r.top - size / 2
    setRipples((prev) => [...prev, { id, x, y, size }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((p) => p.id !== id))
    }, 650)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseDown={addRipple}
      className={`relative overflow-hidden ${className}`}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-yellow-400/35"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          initial={{ scale: 0, opacity: 0.55 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
