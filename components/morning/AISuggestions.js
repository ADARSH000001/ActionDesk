"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const SUGGESTIONS = [
  {
    id:     "gst-quote",
    title:  "Draft GST quotation",
    sub:    "For Verma Enterprises showroom order — 15 cabinets, 8 counters",
    action: "Draft Formal Quotation",
  },
  {
    id:     "payment-reminder",
    title:  "Generate payment reminder",
    sub:    "Invoice #INV-2291 from ABC Traders — due in 4 days",
    action: "Create Payment Reminder",
  },
  {
    id:     "follow-up",
    title:  "Schedule follow-up",
    sub:    "Sharma Furniture quotation — hotel dining chair order",
    action: "Schedule Follow-up",
  },
  {
    id:     "delivery",
    title:  "Prepare delivery update",
    sub:    "Rakesh Traders — sofa set 4 days delayed",
    action: "Draft Apology & Resolution",
  },
];

/**
 * AISuggestions — card with four AI-suggested actions.
 * Generate button fires a mock async action + toast notification.
 */
export default function AISuggestions() {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(null); // suggestion id
  const [done, setDone] = useState(new Set());

  async function handleGenerate(suggestion) {
    if (done.has(suggestion.id)) return;
    setGenerating(suggestion.id);
    await new Promise((r) => setTimeout(r, 1200));
    setGenerating(null);
    setDone((prev) => new Set([...prev, suggestion.id]));
    toast({ message: `${suggestion.title} — drafted successfully.`, type: "success" });
  }

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/15">
          <Sparkles size={11} className="text-accent" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
          Suggested by AI
        </p>
      </div>

      <div className="space-y-3">
        {SUGGESTIONS.map((s, i) => {
          const isGenerating = generating === s.id;
          const isDone       = done.has(s.id);

          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.07 }}
              className="flex items-start gap-3 rounded-btn border border-border bg-elevated px-3 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-slate-200 leading-snug">
                  {s.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted line-clamp-2">
                  {s.sub}
                </p>
              </div>

              <button
                onClick={() => handleGenerate(s)}
                disabled={isGenerating || isDone}
                className={`shrink-0 flex items-center gap-1.5 rounded-btn px-3 py-1.5 text-[11px] font-semibold transition-all active:scale-95 disabled:cursor-default ${
                  isDone
                    ? "bg-success/10 text-success border border-success/20"
                    : "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20"
                }`}
              >
                {isGenerating ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : isDone ? (
                  <Check size={11} />
                ) : (
                  <Sparkles size={11} />
                )}
                {isDone ? "Done" : isGenerating ? "..." : "Generate"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
