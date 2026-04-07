import { motion } from 'framer-motion'
import { fadeSlideUp } from '../animations/variants'
import { useReducedMotion } from '../hooks/useReducedMotion'

function MotionTag({ as, children, ...props }) {
  if (as === 'div') return <motion.div {...props}>{children}</motion.div>
  if (as === 'section') return <motion.section {...props}>{children}</motion.section>
  return <motion.section {...props}>{children}</motion.section>
}

export function SectionReveal({ children, className = '', delay = 0, as = 'section' }) {
  const reduced = useReducedMotion()

  if (reduced) {
    const Tag = as === 'div' ? 'div' : 'section'
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      as={as}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px 80px 0px' }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay,
            type: 'spring',
            stiffness: 280,
            damping: 26,
            mass: 0.45,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerReveal({ children, className = '' }) {
  const reduced = useReducedMotion()
  if (reduced) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px 80px 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', i = 0 }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={fadeSlideUp} custom={i}>
      {children}
    </motion.div>
  )
}
