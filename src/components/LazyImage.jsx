import { motion } from 'framer-motion'
import { useState } from 'react'

export function LazyImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-white/5" aria-hidden />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
        transition={{ duration: 0.5 }}
        className={className}
      />
    </div>
  )
}
