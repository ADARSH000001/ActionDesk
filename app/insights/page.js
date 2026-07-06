"use client";

import { useMemo } from "react";
import { useCards } from "@/lib/useCards";
import { CATEGORIES } from "@/lib/schema";
import { TrendingUp, Mail, MessageCircle, FileText, Mic, AlertTriangle, Calendar, BarChart3 } from "lucide-react";

const SOURCE_CONFIG = {
  Gmail: { icon: Mail, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  WhatsApp: { icon: MessageCircle, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  "Invoice Upload": { icon: FileText, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  "Voice Note": { icon: Mic, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  Manual: { icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
};

const CATEGORY_COLOR = {
  Invoice: "bg-yellow-500/10 text-yellow-400",
  Payment: "bg-emerald-500/10 text-emerald-400",
  Quotation: "bg-blue-500/10 text-blue-400",
  Complaint: "bg-red-500/10 text-red-400",
  Meeting: "bg-purple-500/10 text-purple-400",
  "Purchase Order": "bg-orange-500/10 text-orange-400",
  "Customer Request": "bg-sky-500/10 text-sky-400",
};

function formatDeadline(deadline) {
  if (!deadline) return null;
  const d = new Date(deadline);
  if (isNaN(d)) return deadline;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function InsightsPage() {
  const { cards, loading } = useCards();

  const bySource = useMemo(() => countBy(cards, "source"), [cards]);
  const byCategory = useMemo(() => countBy(cards, "category"), [cards]);
  const pendingPayments = cards.filter(
    (c) => ["Invoice", "Payment"].includes(c.category) && c.status !== "Done"
  );
  const upcoming = cards
    .filter((c) => c.deadline && c.status !== "Done")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  const maxCategory = Math.max(1, ...Object.values(byCategory));
  const totalResolved = cards.filter((c) => c.status === "Done").length;
  const totalPending = cards.filter((c) => c.status !== "Done").length;
  const responseRate = cards.length > 0 ? Math.round((totalResolved / cards.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-white">Business Intelligence</h1>
        <p className="mt-1 text-sm text-muted">Patterns and insights across all your business activity.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-24 rounded-card" />)}
        </div>
      ) : (
        <>
          {/* Business Snapshot KPIs */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <TrendingUp size={12} />
              Business Snapshot
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <SnapshotCard label="Total Actions" value={cards.length} color="text-white" />
              <SnapshotCard label="Pending" value={totalPending} color="text-warning" />
              <SnapshotCard label="Resolved" value={totalResolved} color="text-success" />
              <SnapshotCard label="Resolution Rate" value={`${responseRate}%`} color="text-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Business Categories */}
            <div className="rounded-card border border-border bg-card p-5">
              <SectionHeader icon={BarChart3} label="Business Categories" />
              <div className="mt-4 space-y-3">
                {CATEGORIES.map((cat) => {
                  const count = byCategory[cat] || 0;
                  const pct = Math.round((count / maxCategory) * 100);
                  const color = CATEGORY_COLOR[cat] || "bg-accent/10 text-accent";
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${color}`}>{cat}</span>
                        <span className="text-muted font-medium">{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5">
                        <div
                          className="h-1.5 rounded-full bg-accent transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Communication Sources */}
            <div className="rounded-card border border-border bg-card p-5">
              <SectionHeader icon={Mail} label="Communication Sources" />
              <div className="mt-4 space-y-3">
                {Object.entries(bySource).length === 0 ? (
                  <p className="text-sm text-muted">No imports yet.</p>
                ) : (
                  Object.entries(bySource).map(([source, count]) => {
                    const cfg = SOURCE_CONFIG[source] || SOURCE_CONFIG.Manual;
                    const Icon = cfg.icon;
                    const maxSrc = Math.max(...Object.values(bySource));
                    const pct = Math.round((count / maxSrc) * 100);
                    return (
                      <div key={source}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`flex h-6 w-6 items-center justify-center rounded-btn ${cfg.bg} border ${cfg.border}`}>
                              <Icon size={12} className={cfg.color} />
                            </div>
                            <span className="text-sm text-slate-300">{source}</span>
                          </div>
                          <span className="text-sm font-semibold text-white">{count}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-700 ${cfg.bg.replace("/10", "/50")}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Pending Financial Actions */}
            <div className="rounded-card border border-border bg-card p-5">
              <SectionHeader icon={AlertTriangle} label="Pending Financial Actions" />
              <p className="mt-1 text-xs text-muted mb-4">{pendingPayments.length} invoice(s) / payment(s) awaiting action</p>
              <div className="space-y-2">
                {pendingPayments.length === 0 ? (
                  <p className="text-sm text-muted">All financial actions are clear ✓</p>
                ) : (
                  pendingPayments.map((c) => (
                    <div key={c.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <span className="text-sm text-slate-300 truncate max-w-[60%]">{c.title}</span>
                      <span className={`text-xs font-medium ${c.deadline ? "text-warning" : "text-muted"}`}>
                        {c.deadline ? formatDeadline(c.deadline) : "No date"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="rounded-card border border-border bg-card p-5">
              <SectionHeader icon={Calendar} label="Upcoming Deadlines" />
              <div className="mt-4 space-y-2">
                {upcoming.length === 0 ? (
                  <p className="text-sm text-muted">Nothing on the horizon.</p>
                ) : (
                  upcoming.map((c) => {
                    const d = new Date(c.deadline);
                    const today = new Date();
                    const diffDays = Math.round((d - new Date(today.toDateString())) / 86400000);
                    const urgency = diffDays <= 0 ? "text-danger" : diffDays <= 2 ? "text-warning" : "text-muted";
                    return (
                      <div key={c.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <span className="text-sm text-slate-300 truncate max-w-[65%]">{c.title}</span>
                        <span className={`text-xs font-semibold ${urgency}`}>
                          {diffDays === 0 ? "Today" : diffDays === 1 ? "Tomorrow" : diffDays < 0 ? `${Math.abs(diffDays)}d overdue` : `${diffDays}d`}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SectionHeader({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-muted" />
      <p className="text-sm font-semibold text-white">{label}</p>
    </div>
  );
}

function SnapshotCard({ label, value, color }) {
  return (
    <div className="card-hover rounded-card border border-border bg-card px-5 py-4">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}

function countBy(list, key) {
  return list.reduce((acc, item) => {
    const k = item[key];
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
}
