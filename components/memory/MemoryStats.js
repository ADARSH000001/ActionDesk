"use client";

import { BrainCircuit, Building2, CheckCircle2 } from "lucide-react";

/**
 * MemoryStats — three stat counters at the top of Business Memory.
 *
 * Props:
 *   cards  ActionCard[] (all cards — we derive from done ones)
 */
export default function MemoryStats({ cards }) {
  const done      = cards.filter((c) => c.status === "Done");
  const companies = new Set(done.map((c) => c.company).filter(Boolean)).size;
  const learnings = done.filter((c) => c.learning).length;

  const stats = [
    { icon: Building2,    label: "Companies Learned",  value: companies || done.length, color: "text-accent"  },
    { icon: CheckCircle2, label: "Resolved Actions",   value: done.length,              color: "text-success" },
    { icon: BrainCircuit, label: "AI Learnings Saved", value: learnings || done.length, color: "text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="rounded-card border border-border bg-surface p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-btn bg-white/5">
                <Icon size={15} className={s.color} />
              </div>
            </div>
            <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-[11px] text-muted">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}
