import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useNavbarScroll } from '../hooks/useNavbarScroll'
import { useReducedMotion } from '../hooks/useReducedMotion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
  { to: '/register', label: 'Register' },
]

export function Navbar() {
  const scrolled = useNavbarScroll(20)
  const reduced = useReducedMotion()

  return (
    <motion.header
      initial={reduced ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className={`fixed left-0 right-0 top-0 z-[80] w-full border-b transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled
          ? 'border-yellow-500/25 bg-black/85 shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_48px_rgba(234,179,8,0.1)] backdrop-blur-2xl'
          : 'border-white/12 bg-black/60 shadow-lg shadow-black/50 backdrop-blur-2xl'
      }`}
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/45 to-transparent"
        aria-hidden
      />
      <nav
        className="relative mx-auto grid h-16 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:gap-3 sm:px-4 md:gap-4 md:px-8"
        aria-label="Main navigation"
      >
        <NavLink to="/" className="group flex min-w-0 items-center gap-2 justify-self-start">
          <motion.span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-yellow-500/40 bg-gradient-to-br from-yellow-400/30 to-transparent text-xs font-bold text-[#FFD700] shadow-lg shadow-yellow-500/30 sm:h-10 sm:w-10 sm:text-sm"
            whileHover={reduced ? {} : { scale: 1.08, rotate: -4, boxShadow: '0 0 28px rgba(234,179,8,0.45)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            CC
          </motion.span>
          <div className="min-w-0 max-w-[7.5rem] text-left leading-tight sm:max-w-[10rem] md:max-w-none">
            <span className="font-display block truncate text-xs font-bold tracking-tight text-white sm:text-sm">
              Computer Collegiate
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-yellow-400/80 sm:block">
              Future-ready
            </span>
          </div>
        </NavLink>

        <div className="flex min-h-0 min-w-0 items-stretch justify-self-stretch">
          <div className="flex min-w-0 flex-1 items-center justify-start gap-0 overflow-x-auto overscroll-x-contain py-1 pl-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-0.5 sm:pl-2 md:justify-center md:gap-1 md:pl-0 [&::-webkit-scrollbar]:hidden">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="relative shrink-0 rounded-lg px-0.5 py-1 sm:rounded-xl sm:px-1">
                {({ isActive }) => (
                  <span className="relative inline-flex items-center justify-center px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3">
                    {isActive && (
                      <motion.span
                        layoutId="navActive"
                        className="absolute inset-0 rounded-lg bg-[#FFD700] shadow-lg shadow-yellow-500/45 sm:rounded-xl"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative z-10 whitespace-nowrap text-[11px] font-medium transition-colors sm:text-xs md:text-sm ${
                        isActive ? 'text-black' : 'text-yellow-200 hover:text-white'
                      }`}
                    >
                      {l.label}
                    </span>
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-self-end">
          <motion.div whileHover={reduced ? {} : { scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <NavLink
              to="/register"
              className="inline-block rounded-xl border border-yellow-500/50 bg-[#FFD700]/95 px-2.5 py-1.5 text-xs font-semibold text-black shadow-lg shadow-yellow-500/40 transition hover:bg-[#FFD700] hover:shadow-[0_0_28px_rgba(234,179,8,0.55)] sm:px-4 sm:py-2 sm:text-sm"
            >
              Enroll Now
            </NavLink>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  )
}
