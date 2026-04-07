import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ScrollToTop() {
  const [show, setShow] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 14, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 340, damping: 24 }}
          onClick={go}
          whileHover={reduced ? {} : { scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-8 right-6 z-[96] flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/35 bg-black/65 shadow-[0_0_24px_rgba(234,179,8,0.25)] backdrop-blur-2xl hover:border-yellow-400/60 hover:shadow-[0_0_36px_rgba(250,204,21,0.45)] md:right-10"
          aria-label="Scroll to top"
        >
          <motion.span
            className="text-lg font-bold text-[#FFD700]"
            animate={reduced ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↑
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
