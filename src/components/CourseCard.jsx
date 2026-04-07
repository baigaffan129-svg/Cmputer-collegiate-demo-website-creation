import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GlowFrame } from './GlowFrame'
import { LazyImage } from './LazyImage'
import { TiltCard } from './TiltCard'

export function CourseCard({ course, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        type: 'spring',
        stiffness: 280,
        damping: 26,
        mass: 0.45,
      }}
      whileHover={{
        y: -6,
        transition: { type: 'spring', stiffness: 400, damping: 22 },
      }}
      className="h-full"
    >
      <GlowFrame className="h-full shadow-[0_0_40px_rgba(234,179,8,0.08)] transition-shadow duration-300 hover:shadow-[0_0_48px_rgba(250,204,21,0.18)]" innerClassName="overflow-hidden">
        <TiltCard className="h-full [transform-style:preserve-3d]">
          <Link
            to={`/courses/${course.slug}`}
            className="group block h-full rounded-[calc(1.5rem-2px)] bg-gradient-to-b from-white/[0.07] to-transparent outline-none transition hover:from-white/[0.1] focus-visible:ring-2 focus-visible:ring-yellow-400/70"
          >
            <div className="relative overflow-hidden rounded-t-[calc(1.5rem-2px)]">
              <LazyImage
                src={course.image}
                alt={course.title}
                className="h-44 w-full object-cover transition duration-700 ease-out group-hover:scale-110 md:h-52"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent md:h-32" />
            </div>
            <div className="relative space-y-3 p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400/95">
                {course.category}
              </p>
              <h3 className="font-display text-xl font-bold text-white transition duration-300 group-hover:text-[#FFD700] md:text-2xl">
                {course.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-yellow-300">{course.blurb}</p>
              <div className="flex flex-wrap gap-2 text-xs text-yellow-300">
                <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 backdrop-blur-sm">
                  {course.duration}
                </span>
                <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 backdrop-blur-sm">
                  {course.level}
                </span>
                <span className="rounded-full border border-yellow-500/35 bg-yellow-500/15 px-3 py-1 font-semibold text-[#FFD700] shadow-[0_0_12px_rgba(234,179,8,0.2)]">
                  {course.price}
                </span>
              </div>
            </div>
          </Link>
        </TiltCard>
      </GlowFrame>
    </motion.div>
  )
}
