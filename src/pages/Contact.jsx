import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionReveal } from '../components/SectionReveal'
import { getApiErrorMessage, submitContact } from '../utils/api'

const initial = { name: '', email: '', subject: '', body: '' }

function validate(values) {
  const e = {}
  if (!values.name.trim() || values.name.trim().length < 2) e.name = 'Enter your name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Valid email required'
  if (!values.subject.trim() || values.subject.trim().length < 2) e.subject = 'Subject required'
  if (values.body.trim().length < 10) e.body = 'Message must be at least 10 characters'
  return e
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMsg, setServerMsg] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const v = validate(values)
    setErrors(v)
    if (Object.keys(v).length) return
    setStatus('loading')
    setServerMsg('')
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.body.trim(),
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
        kicker="Contact"
        title="We read every message — usually same day"
        subtitle={
          <>
            Admissions, partnerships, or press — route it here. For enrollment payloads, use{' '}
            <Link className="font-medium text-[#FFD700] underline decoration-yellow-500/50 underline-offset-4 transition hover:text-yellow-300" to="/register">
              Register
            </Link>{' '}
            so your record hits our student system.
          </>
        }
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <SectionReveal className="space-y-5 lg:col-span-1">
            {[
              {
                t: 'Visit',
                lines: ['Block 4B, Tech District', 'Karachi, Pakistan', 'Mon–Sat · 9:00–20:00'],
              },
              {
                t: 'Call',
                lines: ['+92 21 1234567', 'WhatsApp business: same number'],
              },
              {
                t: 'Email',
                lines: ['hello@computercollegiate.edu', 'partners@computercollegiate.edu'],
              },
            ].map((card, i) => (
              <motion.div
                key={card.t}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-2xl transition hover:border-yellow-400/40 hover:shadow-yellow-500/20"
              >
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#FFD700]">
                  {card.t}
                </h3>
                {card.lines.map((l) => (
                  <p key={l} className="mt-2 text-sm text-yellow-200">
                    {l}
                  </p>
                ))}
              </motion.div>
            ))}
            <div className="flex flex-wrap gap-3">
              {['LinkedIn', 'YouTube', 'Instagram'].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-yellow-200 shadow-lg transition hover:border-yellow-400/50 hover:text-[#FFD700]"
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </SectionReveal>

          <div className="lg:col-span-2">
            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl md:p-10"
            >
              <h2 className="font-display text-xl font-bold text-white">Send a note</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Field
                  label="Name"
                  error={errors.name}
                  value={values.name}
                  onChange={(v) => {
                    setValues((s) => ({ ...s, name: v }))
                    setErrors((er) => ({ ...er, name: undefined }))
                  }}
                />
                <Field
                  label="Email"
                  type="email"
                  error={errors.email}
                  value={values.email}
                  onChange={(v) => {
                    setValues((s) => ({ ...s, email: v }))
                    setErrors((er) => ({ ...er, email: undefined }))
                  }}
                />
              </div>
              <div className="relative mt-6">
                <input
                  value={values.subject}
                  onChange={(e) => {
                    setValues((s) => ({ ...s, subject: e.target.value }))
                    setErrors((er) => ({ ...er, subject: undefined }))
                  }}
                  placeholder=" "
                  className="peer block w-full rounded-2xl border border-white/20 bg-black/40 px-4 pb-3 pt-6 text-sm text-white outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
                />
                <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wider text-yellow-400 transition peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                  Subject
                </label>
                {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
              </div>
              <div className="relative mt-6">
                <textarea
                  rows={5}
                  value={values.body}
                  onChange={(e) => {
                    setValues((s) => ({ ...s, body: e.target.value }))
                    setErrors((er) => ({ ...er, body: undefined }))
                  }}
                  placeholder=" "
                  className="peer block w-full rounded-2xl border border-white/20 bg-black/40 px-4 pb-3 pt-6 text-sm text-white outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20"
                />
                <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wider text-yellow-400 transition peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                  Message
                </label>
                {errors.body && <p className="mt-1 text-xs text-red-400">{errors.body}</p>}
              </div>

              {status === 'error' && (
                <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {serverMsg}
                </p>
              )}

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-yellow-200"
                >
                  Message saved — our team will reply as soon as possible.
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                className="mt-8 w-full rounded-2xl border border-yellow-500/50 bg-[#FFD700] py-4 font-display text-sm font-bold text-black shadow-2xl shadow-yellow-500/40 transition disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Send message'}
              </motion.button>
            </motion.form>

            <div className="mt-10 overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
              <iframe
                title="Campus map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.123!2d67.001!3d24.860!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM2LjAiTiA2N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[30%] contrast-[1.05]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, error }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
