"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const STEPS = [
  { label: "Reviewing today's business...", done: false },
  { label: "Gmail", done: true },
  { label: "WhatsApp", done: true },
  { label: "Invoices", done: true },
  { label: "Voice Notes", done: true },
  { label: "Preparing Morning Brief...", done: false },
];

const STEP_DELAYS = [0, 180, 320, 460, 580, 700];

/**
 * MorningLoader
 * Shows a skeleton + step review sequence for ~700ms,
 * then fades into the real content.
 *
 * Props:
 *   children   ReactNode — real page content
 *   loading    boolean   — true while API data is fetching
 */
export default function MorningLoader({ children, loading }) {
  const [phase, setPhase] = useState("loading"); // "loading" | "revealing" | "done"
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (!loading) {
      // Sequence through steps
      STEP_DELAYS.forEach((delay, i) => {
        setTimeout(() => setStepIdx(i), delay);
      });
      // After all steps, start reveal
      setTimeout(() => setPhase("revealing"), 900);
      setTimeout(() => setPhase("done"), 1150);
    }
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {phase !== "done" ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Step sequence */}
          <div className="flex flex-col items-center justify-center py-16 space-y-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
              <Loader2 size={22} className="animate-spin text-accent" />
            </div>
            <div className="space-y-2 text-center">
              {STEPS.slice(0, stepIdx + 1).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center justify-center gap-2 text-sm ${
                    i === stepIdx
                      ? "text-slate-200 font-medium"
                      : "text-muted"
                  }`}
                >
                  {step.done && i < stepIdx ? (
                    <CheckCircle2 size={13} className="text-success" />
                  ) : null}
                  <span>{step.done ? `✓ ${step.label}` : step.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skeleton blocks */}
          <div className="rounded-2xl border border-border bg-surface p-8 animate-pulse">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="h-3 w-24 rounded-full bg-white/5" />
                <div className="h-7 w-56 rounded-lg bg-white/5" />
                <div className="h-4 w-80 rounded bg-white/5" />
                <div className="flex gap-2 pt-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-7 w-28 rounded-full bg-white/5" />
                  ))}
                </div>
              </div>
              <div className="hidden sm:block h-24 w-32 rounded-xl bg-white/5 shrink-0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-card border border-border bg-surface p-5 animate-pulse space-y-3">
                <div className="h-3 w-16 rounded bg-white/5" />
                <div className="h-8 w-12 rounded bg-white/5" />
                <div className="h-3 w-24 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
