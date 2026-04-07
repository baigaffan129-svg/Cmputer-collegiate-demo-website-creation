import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GlowFrame } from '../components/GlowFrame'
import { PageHero } from '../components/PageHero'
import { getApiErrorMessage, registerStudent } from '../utils/api'
import { courseTitlesForSelect } from '../utils/courses'

const initial = { name: '', email: '', phone: '', course: '' }

function validate(values) {
  const e = {}
  if (!values.name.trim() || values.name.trim().length < 2) e.name = 'Enter your full name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Valid email required'
  if (!/^[\d\s+()-]{7,}$/.test(values.phone.trim())) e.phone = 'Valid phone required'
  if (!values.course) e.course = 'Select a course'
  return e
}

export default function Register() {
  const location = useLocation()
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMsg, setServerMsg] = useState('')

  const options = courseTitlesForSelect()

  useEffect(() => {
    const slug = location.state?.courseSlug
    if (!slug) return
    setValues((v) => ({ ...v, course: slug }))
  }, [location.state])

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
      })
      setStatus('success')
      setValues(initial)
    } catch (err) {
      setStatus('error')
      setServerMsg(getApiErrorMessage(err))
    }
  }

  return (
    <div className="relative pb-20">
      <PageHero
        compact
        kicker="Register"
        title="Create your learner record"
        subtitle="One form — admissions confirms cohort and payment plan after review."
        className="pb-4"
      />
      <div className="mx-auto flex max-w-lg justify-center px-4 pb-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        <GlowFrame innerClassName="overflow-hidden" className="shadow-[0_0_50px_rgba(234,179,8,0.12)]">
        <form
          onSubmit={onSubmit}
          className="rounded-[calc(1.5rem-1px)] bg-gradient-to-b from-white/[0.06] to-black/60 p-8 md:p-10"
        >
          <div className="space-y-6">
            <FloatInput
              label="Full name"
              error={errors.name}
              value={values.name}
              onChange={onChange('name')}
              autoComplete="name"
            />
            <FloatInput
              label="Email"
              type="email"
              error={errors.email}
              value={values.email}
              onChange={onChange('email')}
              autoComplete="email"
            />
            <FloatInput
              label="Phone"
              error={errors.phone}
              value={values.phone}
              onChange={onChange('phone')}
              autoComplete="tel"
            />
            <div className="relative">
              <select
                value={values.course}
                onChange={onChange('course')}
                className="peer block w-full appearance-none rounded-2xl border border-white/20 bg-black/40 px-4 pb-3 pt-6 text-sm text-white outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
              >
                <option value="">Select course</option>
                {options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <label className="pointer-events-none absolute left-4 top-2 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                Course
              </label>
              {errors.course && <p className="mt-1 text-xs text-red-400">{errors.course}</p>}
            </div>
          </div>

          {status === 'error' && (
            <p className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {serverMsg}
            </p>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 rounded-xl border border-yellow-500/50 bg-yellow-500/15 px-4 py-5 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD700] text-2xl text-black"
              >
                ✓
              </motion.div>
              <p className="font-display font-bold text-white">You are in the queue</p>
              <p className="mt-2 text-sm text-yellow-200">
                Check your inbox for confirmation and next steps from admissions.
              </p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            whileHover={{ scale: status === 'loading' || status === 'success' ? 1 : 1.02 }}
            whileTap={{ scale: status === 'loading' || status === 'success' ? 1 : 0.98 }}
            className="mt-8 w-full rounded-2xl bg-[#FFD700] py-4 font-display text-sm font-bold text-black shadow-2xl shadow-yellow-500/50 transition hover:shadow-yellow-400/70 disabled:opacity-50"
          >
            {status === 'loading' ? 'Submitting…' : status === 'success' ? 'Registered' : 'Submit registration'}
          </motion.button>
        </form>
        </GlowFrame>
      </motion.div>
      </div>
    </div>
  )
}

function FloatInput({ label, type = 'text', error, value, onChange, autoComplete }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer block w-full rounded-2xl border border-white/20 bg-black/40 px-4 pb-3 pt-6 text-sm text-white outline-none transition focus:border-yellow-400/50 focus:shadow-[0_0_24px_rgba(234,179,8,0.15)] focus:ring-2 focus:ring-yellow-400/25"
      />
      <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wider text-yellow-400 transition peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-yellow-400/80 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
