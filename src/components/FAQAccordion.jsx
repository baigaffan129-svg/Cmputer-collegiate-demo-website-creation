import { AnimatePresence, motion } from 'framer-motion'

export function FAQAccordion({ items, openId, onToggle }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <motion.div
            key={item.id}
            layout
            className="overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.09] to-black/30 shadow-lg shadow-black/50 ring-1 ring-yellow-500/5 backdrop-blur-2xl transition hover:border-yellow-400/35 hover:shadow-[0_8px_32px_rgba(234,179,8,0.08)] hover:ring-yellow-500/15"
          >
            <button
              type="button"
              onClick={() => onToggle(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-base font-semibold text-white md:text-lg">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-500/10 text-[#FFD700] shadow-[0_0_12px_rgba(234,179,8,0.2)]"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="border-t border-white/10 px-5 pb-5 pt-3 text-sm leading-relaxed text-yellow-200 md:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
