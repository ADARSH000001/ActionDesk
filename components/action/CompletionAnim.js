"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/**
 * CompletionAnim — success overlay that plays when a card is marked done.
 * Mount it inside a `relative` container.
 *
 * Props:
 *   show  boolean
 */
export default function CompletionAnim({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="completion"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-card bg-success/10 backdrop-blur-[2px]"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
              <CheckCircle2 size={24} className="text-success" />
            </div>
            <p className="text-xs font-semibold text-success">Completed</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
