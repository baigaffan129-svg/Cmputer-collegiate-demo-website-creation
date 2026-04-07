import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { LazyImage } from '../components/LazyImage'
import { PageHero } from '../components/PageHero'
import { SectionReveal } from '../components/SectionReveal'
import { GALLERY_ITEMS } from '../utils/content'

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <div className="pb-20">
      <PageHero
        kicker="Gallery"
        title="Moments from the floor — demos, critiques, late-night ships"
        subtitle="Click any tile for a focused view. These are representative of our Karachi flagship and synchronized hybrid cohorts."
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionReveal className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
            {GALLERY_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.04 }}
                onClick={() => setActive(item)}
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.08] to-black/40 text-left shadow-lg shadow-black/40 ring-1 ring-yellow-500/10 backdrop-blur-xl transition hover:border-yellow-400/45 hover:shadow-[0_12px_40px_rgba(234,179,8,0.15)] hover:ring-yellow-500/25"
              >
                <LazyImage
                  src={item.src}
                  alt={item.title}
                  className="w-full object-cover transition duration-500 group-hover:scale-110"
                  wrapperClassName="max-h-[420px]"
                />
                <div className="p-4">
                  <p className="font-display text-sm font-semibold text-white">{item.title}</p>
                </div>
              </motion.button>
            ))}
          </SectionReveal>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-black/80 shadow-2xl shadow-yellow-500/30"
            >
              <LazyImage
                src={active.src}
                alt={active.title}
                className="max-h-[75vh] w-full object-contain"
              />
              <div className="border-t border-white/10 p-5">
                <p className="font-display text-lg font-bold text-white">{active.title}</p>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="mt-4 rounded-xl bg-[#FFD700] px-5 py-2 text-sm font-bold text-black"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
