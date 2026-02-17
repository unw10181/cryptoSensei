import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="w-full max-w-lg rounded-xl2 border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 shadow-gaming"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-arcade text-xs tracking-widest">{title}</div>
              <button
                className="text-slate-600 dark:text-slate-300"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
