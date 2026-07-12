"use client";

import { useState } from "react";
import { Sparkles, Clock, ChevronDown, Check, AlertCircle, Info } from "lucide-react";
import { getAiActions, RESOLVING_ACTIONS } from "@/lib/aiAssist";

const PRIORITY_CONFIG = {
  High: {
    label: "High Priority",
    pill: "bg-danger/15 text-danger border border-danger/30",
    dot: "bg-danger",
  },
  Medium: {
    label: "Medium Priority",
    pill: "bg-warning/15 text-warning border border-warning/30",
    dot: "bg-warning",
  },
  Low: {
    label: "Low Priority",
    pill: "bg-success/15 text-success border border-success/30",
    dot: "bg-success",
  },
};

const SOURCE_BADGE = {
  Gmail: { label: "Gmail", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  WhatsApp: { label: "WhatsApp", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  "Invoice Upload": { label: "Invoice", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  "Voice Note": { label: "Voice", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  Manual: { label: "Manual", color: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
};

function formatDeadline(deadline) {
  if (!deadline) return null;
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return deadline;
  const today = new Date();
  const diffDays = Math.round((d - new Date(today.toDateString())) / 86400000);
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  if (diffDays < 0) return `Overdue ${Math.abs(diffDays)}d`;
  return `Due in ${diffDays}d`;
}

export function ActionCardSkeleton() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-24 rounded-full" />
        </div>
        <div className="skeleton h-4 w-20" />
      </div>
      <div className="skeleton h-5 w-3/4" />
      <div className="space-y-2">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
      </div>
      <div className="skeleton h-16 w-full rounded-btn" />
      <div className="flex justify-between">
        <div className="skeleton h-8 w-24 rounded-btn" />
        <div className="skeleton h-8 w-24 rounded-btn" />
      </div>
    </div>
  );
}

export default function ActionCard({ card, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(null);
  const done = card.status === "Done";
  const actions = getAiActions(card);
  const deadlineLabel = formatDeadline(card.deadline);
  const priority = PRIORITY_CONFIG[card.priority] || PRIORITY_CONFIG.Medium;
  const source = SOURCE_BADGE[card.source] || SOURCE_BADGE.Manual;

  async function patchCard(patch) {
    onUpdate?.({ ...card, ...patch });
    try {
      await fetch("/api/cards", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: card.id, patch }),
      });
    } catch {
      // best-effort for the MVP; UI already updated optimistically
    }
  }

  function handleAction(action) {
    setOpen(false);
    if (RESOLVING_ACTIONS.has(action)) {
      patchCard({ status: "Done" });
      setNote(`${action} — marked as done.`);
    } else {
      setNote(`${action} — drafted (prototype).`);
    }
    setTimeout(() => setNote(null), 3000);
  }

  // Derive "why it matters" from the card field or fall back to first sentence of summary
  const whyItMatters =
    card.why_it_matters ||
    (card.summary ? card.summary.split(".")[0] + "." : "");

  return (
    <div
      className={`card-hover animate-slideUp rounded-card border border-border bg-surface p-6 ${done ? "opacity-60" : ""
        }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${priority.pill}`}>
            {priority.label}
          </span>
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${source.color}`}>
            {source.label}
          </span>
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-muted border border-white/5">
            {card.category}
          </span>
        </div>
        {deadlineLabel && (
          <span className={`flex shrink-0 items-center gap-1 text-[11px] font-medium ${deadlineLabel.includes("Overdue") || deadlineLabel === "Due today"
              ? "text-danger"
              : deadlineLabel === "Due tomorrow"
                ? "text-warning"
                : "text-muted"
            }`}>
            <Clock size={11} />
            {deadlineLabel}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-4 text-[15px] font-semibold leading-snug text-white">
        {card.title}
      </h3>

      {/* Summary */}
      <p className="mt-2 text-sm leading-relaxed text-muted">{card.summary}</p>

      {/* Why it matters + Recommended Action */}
      <div className="mt-4 rounded-btn border border-border bg-white/[0.02] p-4 space-y-3">
        {whyItMatters && (
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
              <Info size={11} />
              Why This Matters
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{whyItMatters}</p>
          </div>
        )}
        <div className="border-t border-border pt-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-warning">
            <AlertCircle size={11} />
            Recommended Action
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-200">{card.recommended_action}</p>
        </div>
      </div>

      {/* Action feedback note */}
      {note && (
        <div className="mt-3 animate-fadeIn rounded-btn bg-accent/10 border border-accent/20 px-3 py-2 text-xs text-accent">
          {note}
        </div>
      )}

      {/* Actions row */}
      <div className="mt-5 flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-btn bg-accent px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/20"
          >
            <Sparkles size={13} />
            AI Assist
            <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="absolute left-0 z-10 mt-1.5 w-60 rounded-btn border border-border bg-sidebar p-1.5 shadow-xl animate-fadeIn">
              {actions.map((a) => (
                <button
                  key={a}
                  onClick={() => handleAction(a)}
                  className="block w-full rounded-[8px] px-3 py-2 text-left text-xs text-slate-200 transition-colors hover:bg-white/8 hover:text-white"
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => patchCard({ status: done ? "Pending" : "Done" })}
          className={`flex items-center gap-1.5 rounded-btn border px-3.5 py-2 text-xs font-semibold transition-all ${done
              ? "border-border text-muted hover:text-slate-200"
              : "border-success/40 text-success hover:bg-success/10 hover:border-success/60"
            }`}
        >
          <Check size={13} />
          {done ? "Reopen" : "Mark Done"}
        </button>
      </div>
    </div>
  );
}
