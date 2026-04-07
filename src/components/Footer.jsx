import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../hooks/useReducedMotion'

const social = [
  { label: 'LinkedIn', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'GitHub', href: '#' },
]

const col = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 28,
      delay: i * 0.08,
    },
  }),
}

export function Footer() {
  const reduced = useReducedMotion()

  return (
    <motion.footer
      className="relative mt-24 border-t border-white/15 bg-black/80"
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.1),transparent_55%)]"
        aria-hidden
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <motion.div
          className="space-y-4"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={col}
        >
          <div className="flex items-center gap-2">
            <motion.span
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/40 bg-white/5 text-[#FFD700] shadow-lg shadow-yellow-500/25"
              whileHover={
                reduced
                  ? {}
                  : {
                      scale: 1.06,
                      boxShadow: '0 0 24px rgba(234,179,8,0.35)',
                    }
              }
            >
              CC
            </motion.span>
            <div>
              <p className="font-display text-lg font-bold text-white">Computer Collegiate</p>
              <p className="text-xs text-yellow-400">Premium technology education</p>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-yellow-300">
            We train builders, designers, and defenders with obsessive craft — live mentorship,
            real projects, and career systems that actually move the needle.
          </p>
        </motion.div>
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={col}
        >
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-[#FFD700]">
            Explore
          </p>
          <ul className="space-y-2 text-sm text-yellow-300">
            {[
              ['Courses', '/courses'],
              ['Admissions', '/admissions'],
              ['About', '/about'],
              ['Gallery', '/gallery'],
            ].map(([t, h]) => (
              <li key={h}>
                <Link
                  to={h}
                  className="transition hover:text-white hover:underline decoration-yellow-500/50"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={col}
        >
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-[#FFD700]">
            Campus
          </p>
          <ul className="space-y-2 text-sm text-yellow-300">
            <li>Block 4B, Tech District</li>
            <li>Karachi, Pakistan</li>
            <li>
              <a href="tel:+922112345678" className="hover:text-white">
                +92 21 1234567
              </a>
            </li>
            <li>
              <a href="mailto:hello@computercollegiate.edu" className="hover:text-white">
                hello@computercollegiate.edu
              </a>
            </li>
          </ul>
        </motion.div>
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={col}
        >
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-[#FFD700]">
            Social
          </p>
          <div className="flex flex-wrap gap-3">
            {social.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-yellow-200 shadow-lg shadow-black/40 backdrop-blur-xl transition hover:border-yellow-400/50 hover:bg-white/20 hover:text-[#FFD700] hover:shadow-[0_0_20px_rgba(234,179,8,0.25)]"
              >
                {s.label}
              </motion.a>
            ))}
          </div>
          <p className="mt-6 text-xs text-yellow-500">
            © {new Date().getFullYear()} Computer Collegiate. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
