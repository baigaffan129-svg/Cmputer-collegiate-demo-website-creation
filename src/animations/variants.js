const springSoft = { type: 'spring', stiffness: 320, damping: 28, mass: 0.4 }

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...springSoft, delay: i * 0.07 },
  }),
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Page wrapper now uses inline motion props in Layout (avoids variant keys named initial/animate). */
export const pageTransition = {
  enter: { opacity: 0, y: 16 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  leave: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
}
