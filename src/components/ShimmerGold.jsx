import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ShimmerGold({ children, className = '' }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <span
        className={`bg-gradient-to-r from-[#FFD700] via-yellow-300 to-amber-200 bg-clip-text text-transparent ${className}`}
      >
        {children}
      </span>
    )
  }

  return (
    <motion.span
      className={`inline-block bg-gradient-to-r from-[#FFD700] via-yellow-200 to-amber-300 bg-clip-text text-transparent ${className}`}
      style={{ backgroundSize: '220% 100%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  )
}
