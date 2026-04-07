import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { getApiErrorMessage, registerStudent } from '../utils/api'
import { courseTitlesForSelect } from '../utils/courses'
import { SectionReveal } from '../components/SectionReveal'

const initial = { name: '', email: '', phone: '', course: '', message: '' }

function validate(values) {
  const e = {}
  if (!values.name.trim() || values.name.trim().length < 2) e.name = 'Enter your full name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Valid email required'
  if (!/^[\d\s+()-]{7,}$/.test(values.phone.trim())) e.phone = 'Valid phone required'
  if (!values.course) e.course = 'Select a program'
  return e
}

export default function Admissions() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMsg, setServerMsg] = useState('')

  const options = courseTitlesForSelect()

  const onChange = (k) => (ev) => {
    setValues((v) => ({ ...v, [k]: ev.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const v = validate(values)
    setErrors(v)
    if (Object.keys(v).length) return
    setStatus('loading')
    setServerMsg('')
    try {
      await registerStudent({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        course: values.course,
        ...(values.message.trim() ? { notes: values.message.trim() } : {}),
      })
      setStatus('success')
      setValues(initial)
    } catch (err) {
      setStatus('error')
      setServerMsg(getApiErrorMessage(err))
    }
  }

  return (
    <div className="pb-20">
      <PageHero
        kicker="Admissions"
        title="Your path in — transparent, structured, human"
        subtitle="We admit in cohorts to protect mentor ratios. Submit your interest below (same data as registration); add context in the message field and our team will fold it into your admissions call. Scholarships and installment plans are discussed after your diagnostic."
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mt-8 grid gap-12 lg:grid-cols-5">
            <SectionReveal className="space-y-8 lg:col-span-2">
              {[
                {
                  t: '1 · Diagnostic',
                  d: '45-minute skills map — no trick questions; we want accurate placement.',
                },
                {
                  t: '2 · Program match',
                  d: 'We recommend a track (or a primer) with a week-by-week preview.',
                },
                {
                  t: '3 · Enrollment',
                  d: 'Secure your seat, choose batch timing, and unlock pre-work.',
                },
                {
                  t: '4 · Kickoff',
                  d: 'Orientation, tooling setup, and your first shipped artifact within 10 days.',
                },
              ].map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <h3 className="font-display font-bold text-[#FFD700]">{s.t}</h3>
                  <p className="mt-2 text-sm text-yellow-300">{s.d}</p>
                </motion.div>
              ))}
              <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5">
                <p className="text-sm text-yellow-200">
                  Prefer the streamlined signup only?{' '}
                  <Link className="font-semibold text-[#FFD700] underline" to="/register">
                    Use the Register page
                  </Link>
                  .
                </p>
              </div>
            </SectionReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <form
                onSubmit={onSubmit}
                className="rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-2xl shadow-yellow-500/15 backdrop-blur-2xl md:p-10"
              >
                <h2 className="font-display text-xl font-bold text-white">Admissions inquiry</h2>
                <p className="mt-2 text-sm text-yellow-300">
                  Fields marked with your profile are stored; optional message is for the call only.
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <FloatingField
                    label="Full name"
                    error={errors.name}
                    inputProps={{
                      value: values.name,
                      onChange: onChange('name'),
                      autoComplete: 'name',
                    }}
                  />
                  <FloatingField
                    label="Email"
                    error={errors.email}
                    inputProps={{
                      type: 'email',
                      value: values.email,
                      onChange: onChange('email'),
                      autoComplete: 'email',
                    }}
                  />
                  <FloatingField
                    label="Phone"
                    error={errors.phone}
                    inputProps={{
                      value: values.phone,
                      onChange: onChange('phone'),
                      autoComplete: 'tel',
                    }}
                  />
                  <div className="relative">
                    <select
                      value={values.course}
                      onChange={onChange('course')}
                      className="peer block w-full appearance-none rounded-2xl border border-white/20 bg-black/40 px-4 pb-3 pt-6 text-sm text-white outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
                    >
                      <option value="">Program interest</option>
                      {options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <label className="pointer-events-none absolute left-4 top-2 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                      Course
                    </label>
                    {errors.course && (
                      <p className="mt-1 text-xs text-red-400">{errors.course}</p>
                    )}
                  </div>
                </div>

                <div className="relative mt-6">
                  <textarea
                    rows={4}
                    value={values.message}
                    onChange={onChange('message')}
                    placeholder=" "
                    className="peer block w-full rounded-2xl border border-white/20 bg-black/40 px-4 pb-3 pt-6 text-sm text-white outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
                  />
                  <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wider text-yellow-400 transition peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Message (optional — for admissions call)
                  </label>
                </div>

                {status === 'error' && (
                  <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {serverMsg}
                  </p>
                )}

                {status === 'success' && (
                  <motion.p
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-4 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100"
                  >
                    Received — admissions will reach out with next steps. Your optional message will
                    inform that conversation.
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  className="mt-8 w-full rounded-2xl bg-[#FFD700] py-4 font-display text-sm font-bold text-black shadow-2xl shadow-yellow-500/40 transition disabled:opacity-60"
                >
                  {status === 'loading' ? 'Submitting…' : 'Submit inquiry'}
                </motion.button>
              </form>
            </motion.div>
          </div>
      </div>
    </div>
  )
}

function FloatingField({ label, error, inputProps }) {
  return (
    <div className="relative">
      <input
        {...inputProps}
        placeholder=" "
        className="peer block w-full rounded-2xl border border-white/20 bg-black/40 px-4 pb-3 pt-6 text-sm text-white outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
      />
      <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wider text-yellow-400 transition peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
