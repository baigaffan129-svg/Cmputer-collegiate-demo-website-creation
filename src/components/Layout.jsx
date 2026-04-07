import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BackgroundMesh } from './BackgroundMesh'
import { CursorGlow } from './CursorGlow'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollProgress } from './ScrollProgress'
import { ScrollToTop } from './ScrollToTop'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Layout() {
  const location = useLocation()
  const reduced = useReducedMotion()

  const pageSpring = reduced
    ? { duration: 0.25 }
    : { type: 'spring', stiffness: 280, damping: 30, mass: 0.35 }

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-black font-sans text-yellow-200">
      <BackgroundMesh />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]"
        aria-hidden
      />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 w-full scroll-pt-16 pt-16 min-h-[40vh]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 22, scale: 0.985, filter: 'blur(10px)' }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: reduced ? undefined : 'blur(0px)',
            }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: -14, scale: 0.99, filter: 'blur(6px)' }
            }
            transition={pageSpring}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
