import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionReveal, StaggerReveal, RevealItem } from '../components/SectionReveal'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { LazyImage } from '../components/LazyImage'

const milestones = [
  { year: '2009', title: 'Founded', desc: 'Small lab cohort focused on employable engineering craft.' },
  { year: '2014', title: 'Industry board', desc: 'Partner syllabus reviews twice a year — still our ritual.' },
  { year: '2019', title: 'Cloud & security wings', desc: 'Dedicated tracks with live SOC and cloud sandboxes.' },
  { year: '2024', title: 'National hybrid', desc: 'Studios in three cities + synchronized remote cohorts.' },
]

const values = [
  { t: 'Radical clarity', d: 'If a learner is confused, we fix the curriculum — not the learner.' },
  { t: 'Proof over posture', d: 'Portfolios, commits, and demos beat certificates in our grading.' },
  { t: 'Safety to struggle', d: 'Hard problems are assigned with scaffolding, not shame.' },
  { t: 'Long-term craft', d: 'We optimize for skills that compound — not buzzword bingo.' },
]

export default function About() {
  return (
    <div className="pb-20">
      <PageHero
        kicker="About"
        title="We are a craft school disguised as a college"
        subtitle="Computer Collegiate exists for one selfish reason: to graduate people who can sit in a real standup tomorrow and contribute. Our story is measured in shipped projects, hiring loops cleared, and alumni who still text us at midnight from prod incidents — because we taught them how to think, not just how to pass."
      />

      <SectionReveal className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <LazyImage
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80"
            alt="Students collaborating"
            className="h-80 w-full rounded-3xl object-cover shadow-[0_0_40px_rgba(234,179,8,0.12)] ring-2 ring-yellow-500/20 ring-offset-2 ring-offset-black md:h-[420px]"
          />
          <div>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Our origin</h2>
            <p className="mt-4 leading-relaxed text-yellow-300">
              What started as weekend workshops for working developers became a full institute when
              employers asked for one thing: candidates who could read a ticket, propose a plan, and
              own the outcome. We rebuilt our programs around production literacy — git fluency,
              observability, design critique, and kind code review.
            </p>
            <p className="mt-4 leading-relaxed text-yellow-300">
              Today, every cohort still ends in a public demo day with hiring managers in the room
              (or on stream). No private grading. No mystery rubrics. Just work, in the open.
            </p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Vision</h2>
        <p className="mt-4 max-w-3xl text-lg text-yellow-300">
          A regional talent network where rigorous practice is the default — and where companies hire
          for demonstrated judgment, not keyword matches alone.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.1] to-transparent p-6 shadow-xl backdrop-blur-xl transition hover:border-yellow-400/45 hover:shadow-[0_12px_40px_rgba(234,179,8,0.12)]"
            >
              <h3 className="font-display text-lg font-bold text-[#FFD700]">{v.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-yellow-300">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Milestones</h2>
        <div className="mt-10 space-y-6">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col gap-4 rounded-3xl border border-white/12 bg-gradient-to-r from-white/[0.06] to-black/50 p-6 shadow-lg backdrop-blur-xl md:flex-row md:items-center md:gap-10 md:p-8"
            >
              <span className="font-display text-3xl font-bold text-[#FFD700]">{m.year}</span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">{m.title}</h3>
                <p className="mt-2 text-yellow-300">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-white md:text-4xl">
          By the numbers
        </h2>
        <StaggerReveal className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { v: 4200, s: '+', l: 'Alumni placed or promoted within 12 months' },
            { v: 186, s: '', l: 'Hiring partners actively reviewing portfolios' },
            { v: 28, s: '', l: 'Countries represented in remote cohorts' },
          ].map((row, i) => (
            <RevealItem key={row.l} i={i}>
              <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-b from-white/[0.08] to-black/40 p-8 text-center shadow-[0_0_32px_rgba(234,179,8,0.08)] backdrop-blur-xl">
                <p className="font-display text-5xl font-bold text-white">
                  <AnimatedCounter value={row.v} suffix={row.s} />
                </p>
                <p className="mt-3 text-sm text-yellow-300">{row.l}</p>
              </div>
            </RevealItem>
          ))}
        </StaggerReveal>
      </SectionReveal>

      <SectionReveal className="mx-auto mt-24 max-w-7xl px-4 text-center md:px-8">
        <Link
          to="/register"
          className="inline-flex rounded-2xl bg-[#FFD700] px-10 py-4 font-display text-sm font-bold text-black shadow-2xl shadow-yellow-500/40 transition hover:shadow-yellow-400/70"
        >
          Join the next chapter
        </Link>
      </SectionReveal>
    </div>
  )
}
