import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'
import { MagneticButton } from '../components/MagneticButton'
import { SectionReveal } from '../components/SectionReveal'
import { getCourseBySlug } from '../utils/courses'

const MotionLink = motion.create(Link)

export default function CourseDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const course = getCourseBySlug(slug || '')
  const [openMod, setOpenMod] = useState(0)

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <p className="font-display text-2xl text-white">Course not found</p>
        <Link to="/courses" className="mt-6 text-[#FFD700] underline">
          Back to catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-20">
      <section className="relative h-[min(52vh,520px)] overflow-hidden">
        <LazyImage
          src={course.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,rgba(234,179,8,0.18),transparent_60%)]" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 md:px-8 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
              {course.category}
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {course.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-yellow-200 backdrop-blur-xl">
                {course.duration}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-yellow-200 backdrop-blur-xl">
                {course.level}
              </span>
              <span className="rounded-full border border-yellow-500/40 bg-yellow-500/15 px-4 py-1.5 text-[#FFD700]">
                {course.price}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton
                as={MotionLink}
                to="/register"
                state={{ courseSlug: course.slug }}
                className="inline-block rounded-2xl bg-[#FFD700] px-8 py-3.5 font-display text-sm font-bold text-black shadow-2xl shadow-yellow-500/40"
              >
                Enroll now
              </MagneticButton>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-2xl border border-white/25 bg-white/10 px-8 py-3.5 font-display text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
              >
                ← Back
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionReveal className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Overview</h2>
            <div className="mt-4 space-y-4 text-yellow-300">
              {course.overview.split('\n\n').map((para) => (
                <p key={para.slice(0, 24)} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
            <h3 className="font-display text-lg font-bold text-white">Quick facts</h3>
            <ul className="mt-4 space-y-3 text-sm text-yellow-300">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Format</span>
                <span className="text-white">Hybrid + labs</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Mentor ratio</span>
                <span className="text-white">1 : 14 max</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Credential</span>
                <span className="text-white">Verified digital</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Prerequisites</span>
                <span className="text-right text-white">{course.level} baseline</span>
              </li>
            </ul>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Curriculum</h2>
        <p className="mt-2 text-yellow-300">
          Expand each module — every bullet maps to a deliverable you keep in your portfolio repo.
        </p>
        <div className="mt-8 space-y-3">
          {course.curriculum.map((mod, idx) => (
            <motion.div
              key={mod.title}
              layout
              className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setOpenMod(openMod === idx ? -1 : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-display font-semibold text-white">{mod.title}</span>
                <motion.span animate={{ rotate: openMod === idx ? 45 : 0 }} className="text-[#FFD700]">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openMod === idx && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10 px-5 pb-4 pt-2"
                  >
                    {mod.items.map((item) => (
                      <li key={item} className="flex gap-2 py-2 text-sm text-yellow-300">
                        <span className="text-[#FFD700]">▹</span>
                        {item}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Lead instructor</h2>
        <div className="mt-8 flex flex-col gap-8 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl md:flex-row md:items-center">
          <LazyImage
            src={course.instructor.image}
            alt={course.instructor.name}
            className="h-48 w-48 shrink-0 rounded-2xl object-cover ring-2 ring-yellow-500/40"
          />
          <div>
            <h3 className="font-display text-2xl font-bold text-white">{course.instructor.name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-yellow-400">
              {course.instructor.title}
            </p>
            <p className="mt-4 text-yellow-300">{course.instructor.bio}</p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Reviews</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {course.reviews.map((r) => (
            <motion.div
              key={r.author}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/15 bg-black/40 p-6 shadow-lg backdrop-blur-xl"
            >
              <p className="text-[#FFD700]">{'★'.repeat(r.rating)}</p>
              <p className="mt-3 text-sm leading-relaxed text-yellow-200">“{r.text}”</p>
              <p className="mt-4 text-xs font-semibold text-yellow-400">{r.author}</p>
            </motion.div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <div className="rounded-[2rem] border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-transparent p-10 text-center shadow-2xl shadow-yellow-500/20 backdrop-blur-2xl">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Lock your seat for {course.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-yellow-300">
            Registration takes under two minutes. Admissions will confirm prerequisites and cohort
            timing within one business day.
          </p>
          <MagneticButton
            as={MotionLink}
            to="/register"
            state={{ courseSlug: course.slug }}
            className="mt-8 inline-block rounded-2xl bg-[#FFD700] px-10 py-4 font-display text-sm font-bold text-black shadow-2xl shadow-yellow-500/50"
          >
            Go to registration
          </MagneticButton>
        </div>
      </SectionReveal>
    </div>
  )
}
