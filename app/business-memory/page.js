"use client";

import { useCards } from "@/lib/useCards";
import { BrainCircuit, CheckCircle2, Clock, Mail, MessageCircle, FileText, Mic } from "lucide-react";

const SOURCE_ICON = {
  Gmail: { icon: Mail, color: "text-red-400" },
  WhatsApp: { icon: MessageCircle, color: "text-green-400" },
  "Invoice Upload": { icon: FileText, color: "text-yellow-400" },
  "Voice Note": { icon: Mic, color: "text-purple-400" },
};

const CATEGORY_COLOR = {
  Invoice: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Payment: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Quotation: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Complaint: "bg-red-500/10 text-red-400 border-red-500/20",
  Meeting: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Purchase Order": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Customer Request": "bg-sky-500/10 text-sky-400 border-sky-500/20",
};

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function BusinessMemoryPage() {
  const { cards, loading } = useCards();
  const done = cards
    .filter((c) => c.status === "Done")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Business Memory</h1>
        <p className="mt-1 text-sm text-muted">
          Every resolved action becomes institutional knowledge.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-16 w-full rounded-card" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && done.length === 0 && (
        <div className="animate-fadeIn rounded-card border border-border bg-card p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            <BrainCircuit size={28} className="text-accent/60" />
          </div>
          <h2 className="mt-4 text-base font-semibold text-white">Nothing here yet</h2>
          <p className="mt-2 max-w-sm mx-auto text-sm text-muted leading-relaxed">
            Everything you complete becomes institutional knowledge. Mark Actions as Done from the{" "}
            <a href="/action-center" className="text-accent hover:underline">Action Center</a>{" "}
            and they'll automatically appear here.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-success" />
              <span>Mark actions done</span>
            </div>
            <span className="text-border">→</span>
            <div className="flex items-center gap-1.5">
              <BrainCircuit size={13} className="text-accent" />
              <span>Stored here automatically</span>
            </div>
          </div>
        </div>
      )}

      {/* Done cards */}
      {!loading && done.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-muted">{done.length} resolved action{done.length !== 1 ? "s" : ""}</p>
          {done.map((c) => {
            const srcCfg = SOURCE_ICON[c.source];
            const SrcIcon = srcCfg?.icon;
            const catColor = CATEGORY_COLOR[c.category] || "bg-white/5 text-muted border-border";
            return (
              <div
                key={c.id}
                className="card-hover animate-fadeIn flex items-center justify-between gap-4 rounded-card border border-border bg-card px-5 py-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {SrcIcon && (
                    <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-btn bg-white/5">
                      <SrcIcon size={14} className={srcCfg.color} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{c.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted">
                      <Clock size={10} />
                      <span>{formatDate(c.createdAt)}</span>
                      {c.recommended_action && (
                        <>
                          <span className="text-border">·</span>
                          <span className="truncate max-w-[200px]">{c.recommended_action}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${catColor}`}>
                    {c.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-success/10 border border-success/20 px-2.5 py-0.5 text-[11px] font-semibold text-success">
                    <CheckCircle2 size={10} />
                    Resolved
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
