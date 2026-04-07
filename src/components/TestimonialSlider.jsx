import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GlowFrame } from './GlowFrame'
import { LazyImage } from './LazyImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function TestimonialSlider({ items }) {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 5200)
    return () => clearInterval(t)
  }, [items.length, reduced])

  const cur = items[i]

  return (
    <div className="relative mx-auto max-w-3xl">
      <GlowFrame className="shadow-[0_0_45px_rgba(234,179,8,0.1)]" innerClassName="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.name}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="bg-gradient-to-br from-white/[0.07] to-black/50 p-8 md:p-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <LazyImage
                src={cur.avatar}
                alt={cur.name}
                className="h-20 w-20 rounded-2xl object-cover ring-2 ring-yellow-500/50 shadow-[0_0_24px_rgba(234,179,8,0.25)]"
              />
              <div>
                <p className="text-lg leading-relaxed text-gray-100 md:text-xl">
                  “{cur.quote}”
                </p>
                <p className="mt-4 font-display text-sm font-semibold text-[#FFD700]">
                  {cur.name}
                </p>
                <p className="text-sm text-yellow-300">{cur.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </GlowFrame>
      <div className="mt-8 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === i
                ? 'w-9 bg-[#FFD700] shadow-[0_0_16px_rgba(255,215,0,0.65)]'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Show testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
