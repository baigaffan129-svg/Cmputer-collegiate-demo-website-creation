import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { CourseCard } from '../components/CourseCard'
import { FAQAccordion } from '../components/FAQAccordion'
import { GlowFrame } from '../components/GlowFrame'
import { LazyImage } from '../components/LazyImage'
import { MagneticButton } from '../components/MagneticButton'
import { SectionHeading } from '../components/SectionHeading'
import { SectionReveal, StaggerReveal, RevealItem } from '../components/SectionReveal'
import { ShimmerGold } from '../components/ShimmerGold'
import { TestimonialSlider } from '../components/TestimonialSlider'
import { TypingHero } from '../components/TypingHero'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  HOME_FAQ,
  HOME_STATS,
  INSTRUCTORS,
  TESTIMONIALS,
  WHY_CHOOSE,
} from '../utils/content'
import { COURSES } from '../utils/courses'

const MotionLink = motion.create(Link)
const HERO_WORDS = ['Build', 'the', 'future', 'at']

const faqItems = HOME_FAQ.map((f, id) => ({ id, ...f }))

export default function Home() {
  const reduced = useReducedMotion()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const [faqOpen, setFaqOpen] = useState(null)

  const preview = COURSES.slice(0, 4)

  return (
    <div className="pb-8">
      <section
        ref={heroRef}
        className="relative overflow-hidden px-4 pb-24 pt-6 md:px-8 md:pb-32 md:pt-10"
      >
        <motion.div
          style={{ y: parallaxY, scale: scaleBg }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-yellow-500/20 blur-[100px]" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-amber-400/15 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-yellow-300/10 blur-[90px]" />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.5]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(250,204,21,0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(250,204,21,0.045) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
            maskImage: 'linear-gradient(to bottom, black 0%, black 45%, transparent 100%)',
          }}
          aria-hidden
        />

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-full border border-yellow-500/20 bg-white/5 shadow-lg shadow-yellow-500/10 backdrop-blur-md"
            style={{
              width: 40 + i * 22,
              height: 40 + i * 22,
              left: `${8 + i * 14}%`,
              top: `${12 + (i % 3) * 18}%`,
            }}
            animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <motion.p
              className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/35 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300 shadow-lg shadow-yellow-500/25 backdrop-blur-2xl"
              initial={reduced ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.1 }}
            >
              {!reduced && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-yellow-400/40"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <span className="relative z-10">Admissions open · 2026 cohorts</span>
            </motion.p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
              <span className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1">
                {HERO_WORDS.map((w, i) => (
                  <motion.span
                    key={w}
                    className="inline-block"
                    initial={reduced ? false : { opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 22,
                      delay: 0.12 + i * 0.06,
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>{' '}
              <motion.span
                className="mt-1 inline-block md:mt-0"
                initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.45 }}
              >
                <ShimmerGold className="drop-shadow-[0_0_28px_rgba(255,215,0,0.35)]">
                  Computer Collegiate
                </ShimmerGold>
              </motion.span>
            </h1>
            <div className="mt-6 max-w-2xl">
              <TypingHero />
            </div>
            <motion.p
              className="mt-6 max-w-2xl text-base leading-relaxed text-yellow-300 md:text-lg"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Premium, mentor-led programs across engineering, design, cloud, security, and data —
              engineered for portfolios employers can verify. No filler weeks: every module ships
              artifacts you can demo on day one.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, type: 'spring', stiffness: 260, damping: 26 }}
            >
              <MagneticButton
                as={MotionLink}
                to="/register"
                className="inline-block rounded-2xl border border-yellow-500/50 bg-[#FFD700] px-8 py-3.5 font-display text-sm font-bold text-black shadow-2xl shadow-yellow-500/40 transition hover:shadow-[0_0_32px_rgba(250,204,21,0.55)]"
              >
                Start your application
              </MagneticButton>
              <MotionLink
                to="/courses"
                whileHover={reduced ? {} : { scale: 1.03, borderColor: 'rgba(250,204,21,0.45)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="inline-block rounded-2xl border border-white/25 bg-white/10 px-8 py-3.5 font-display text-sm font-semibold text-white shadow-2xl backdrop-blur-2xl transition hover:border-yellow-400/40 hover:bg-white/20 hover:shadow-[0_0_24px_rgba(234,179,8,0.15)]"
              >
                Browse programs
              </MotionLink>
            </motion.div>
            <motion.div
              className="mt-12 flex flex-wrap gap-8 text-sm text-yellow-400"
              initial={reduced ? false : 'hidden'}
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.75 } },
              }}
            >
              {['ISO-aligned processes', 'Hiring partner reviews', 'Scholarship windows'].map(
                (t) => (
                  <motion.span
                    key={t}
                    className="flex items-center gap-2"
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { type: 'spring', stiffness: 300, damping: 24 },
                      },
                    }}
                  >
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]"
                      animate={
                        reduced
                          ? undefined
                          : { scale: [1, 1.35, 1], opacity: [1, 0.75, 1] }
                      }
                      transition={{ duration: 2, repeat: Infinity, delay: t.length * 0.02 }}
                    />
                    {t}
                  </motion.span>
                ),
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionReveal className="mx-auto max-w-7xl px-4 md:px-8">
        <GlowFrame innerClassName="p-6 md:p-10">
          <div className="grid gap-4 md:grid-cols-3">
            {HOME_STATS.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { type: 'spring', stiffness: 400, damping: 18 },
                }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/40 p-6 text-center shadow-inner shadow-black/20 transition-shadow hover:border-yellow-500/30 hover:shadow-[0_0_32px_rgba(234,179,8,0.15)] md:text-left"
              >
                <p className="font-display text-4xl font-bold md:text-5xl">
                  <span className="bg-gradient-to-br from-white via-gray-100 to-amber-200/80 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(250,204,21,0.15)]">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </span>
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-yellow-300">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </GlowFrame>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8" delay={0.05}>
        <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Programs"
            title="Flagship courses — built like products"
            subtitle="Each track bundles live instruction, async depth, labs, and career artifacts. Tap a card for syllabus, instructors, and alumni proof."
            className="max-w-2xl"
          />
          <MotionLink
            to="/courses"
            whileHover={{ scale: 1.04, x: 4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition hover:border-yellow-400/50 hover:text-[#FFD700] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
          >
            View all courses →
          </MotionLink>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {preview.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Why us"
          title="Designed for momentum — not passive watching"
          className="mb-10 max-w-3xl"
        />
        <StaggerReveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((w, idx) => (
            <RevealItem key={w.title} i={idx}>
              <motion.div
                whileHover={{
                  y: -8,
                  rotate: reduced ? 0 : -0.8,
                  transition: { type: 'spring', stiffness: 360, damping: 22 },
                }}
                className="h-full rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-transparent p-6 shadow-xl shadow-black/50 backdrop-blur-xl transition hover:border-yellow-400/45 hover:shadow-[0_12px_48px_rgba(234,179,8,0.2)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-500/25 bg-yellow-500/10 text-2xl shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                  {w.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-yellow-300">{w.desc}</p>
              </motion.div>
            </RevealItem>
          ))}
        </StaggerReveal>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Voices"
          title="Learners who leveled up — and stayed loud about it"
          className="mb-12"
        />
        <div className="mt-2">
          <TestimonialSlider items={TESTIMONIALS} />
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Mentors"
          title="Instructors who still ship"
          subtitle="No detached academics — leads rotate through product, security, and cloud work while teaching. You get playbooks from this quarter, not a decade ago."
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INSTRUCTORS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.1] to-black/50 shadow-2xl shadow-black/40 ring-1 ring-yellow-500/10 backdrop-blur-xl transition hover:border-yellow-400/50 hover:shadow-[0_20px_50px_rgba(234,179,8,0.12)] hover:ring-yellow-500/25"
            >
              <LazyImage
                src={p.image}
                alt={p.name}
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="space-y-2 p-5">
                <h3 className="font-display text-lg font-bold text-white">{p.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-yellow-400/90">
                  {p.title}
                </p>
                <p className="text-sm text-yellow-300">{p.bio}</p>
                <div className="flex gap-3 pt-2">
                  <a
                    href={p.social.linkedin}
                    className="text-xs font-semibold text-yellow-400 transition hover:text-[#FFD700]"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={p.social.github}
                    className="text-xs font-semibold text-yellow-400 transition hover:text-[#FFD700]"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Answers before you even open a tab"
              subtitle="Still curious? Our admissions desk replies same-day on weekdays — no ticket black holes."
            />
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/30 backdrop-blur-xl transition hover:border-yellow-400/50 hover:shadow-[0_0_24px_rgba(234,179,8,0.12)]"
            >
              Talk to admissions
            </Link>
          </div>
          <FAQAccordion
            items={faqItems}
            openId={faqOpen}
            onToggle={(id) => setFaqOpen(id)}
          />
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 via-white/[0.07] to-black/90 p-10 shadow-[0_0_60px_rgba(234,179,8,0.15),0_25px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:p-16"
          whileHover={
            reduced
              ? {}
              : {
                  scale: 1.015,
                  boxShadow: '0 0 60px rgba(234,179,8,0.2)',
                  transition: { type: 'spring', stiffness: 280, damping: 24 },
                }
          }
        >
          <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-yellow-400/20 blur-[100px]" />
          <div className="relative max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Ready to commit to a serious craft school?
            </h2>
            <p className="mt-4 text-lg text-yellow-200">
              Seats are capped per cohort to keep mentor ratios honest. Reserve your diagnostic
              and course map — we will tell you exactly which track fits.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton
                as={MotionLink}
                to="/register"
                className="inline-block rounded-2xl bg-[#FFD700] px-10 py-4 font-display text-sm font-bold text-black shadow-2xl shadow-yellow-500/50 transition hover:shadow-yellow-400/80"
              >
                Apply for next cohort
              </MagneticButton>
              <Link
                to="/admissions"
                className="inline-flex items-center rounded-2xl border border-white/25 px-10 py-4 font-display text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
              >
                Admissions guide
              </Link>
            </div>
          </div>
        </motion.div>
      </SectionReveal>
    </div>
  )
}
