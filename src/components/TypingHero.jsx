import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const LINES = [
  'Ship production-grade software.',
  'Design systems people love.',
  'Defend what matters most.',
]

export function TypingHero() {
  const reduced = useReducedMotion()
  const [lineIndex, setLineIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const full = LINES[lineIndex % LINES.length]

  useEffect(() => {
    if (reduced) {
      setDisplay(full)
      return
    }
    let i = 0
    setDisplay('')
    const tick = () => {
      i += 1
      setDisplay(full.slice(0, i))
      if (i < full.length) {
        window.requestAnimationFrame(() => setTimeout(tick, 38 + Math.random() * 28))
      } else {
        setTimeout(() => setLineIndex((n) => n + 1), 2200)
      }
    }
    const t = setTimeout(tick, 400)
    return () => clearTimeout(t)
  }, [lineIndex, full, reduced])

  return (
    <div className="min-h-[3.2rem] md:min-h-[4rem]">
      <AnimatePresence mode="wait">
        <motion.p
          key={lineIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="text-lg text-yellow-200 md:text-2xl"
        >
          <span className="text-white">{display}</span>
          <motion.span
            className="ml-0.5 inline-block h-6 w-0.5 bg-[#FFD700] align-middle shadow-[0_0_12px_rgba(255,215,0,0.8)]"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.9 }}
          />
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
