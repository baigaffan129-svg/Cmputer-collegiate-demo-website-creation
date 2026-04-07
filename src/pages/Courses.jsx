import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { CourseCard } from '../components/CourseCard'
import { PageHero } from '../components/PageHero'
import { SectionReveal } from '../components/SectionReveal'
import { CATEGORIES, COURSES } from '../utils/courses'

export default function Courses() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const okCat = cat === 'All' || c.category === cat
      const qq = q.trim().toLowerCase()
      const okQ =
        !qq ||
        c.title.toLowerCase().includes(qq) ||
        c.blurb.toLowerCase().includes(qq) ||
        c.category.toLowerCase().includes(qq)
      return okCat && okQ
    })
  }, [cat, q])

  return (
    <div className="pb-20">
      <PageHero
        kicker="Catalog"
        title="Courses engineered for hire-ready output"
        subtitle="Filter by discipline or search by keyword. Every program includes mentor reviews, capstone defense, and a public artifact you can link on day one of your job hunt."
      />

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-2 md:px-8">
        <SectionReveal className="space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative max-w-xl flex-1">
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by title, topic, or category…"
                  className="w-full rounded-2xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white shadow-2xl backdrop-blur-2xl placeholder:text-yellow-400 outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/30"
                />
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400">
                  ⌕
                </span>
              </div>
              <p className="text-sm text-yellow-400">
                Showing <span className="font-semibold text-[#FFD700]">{filtered.length}</span>{' '}
                programs
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <motion.button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    cat === c
                      ? 'border-yellow-400/60 bg-[#FFD700] text-black shadow-lg shadow-yellow-500/40'
                      : 'border-white/20 bg-white/10 text-yellow-200 backdrop-blur-xl hover:border-yellow-400/40 hover:bg-white/20'
                  }`}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </SectionReveal>

          <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course, i) => (
              <motion.div key={course.id} layout transition={{ duration: 0.35 }}>
                <CourseCard course={course} index={i} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-yellow-400">
              No matches — try another keyword or clear filters.
            </p>
          )}
      </div>
    </div>
  )
}
