"use client";

import { AlertCircle, Clock3, Wallet, Truck, Mail, MessageCircle, FileText, Zap, TrendingUp } from "lucide-react";
import { useCards } from "@/lib/useCards";
import KpiCard from "@/components/KpiCard";
import SyncButtons from "@/components/SyncButtons";

const FOCUS_RANK = { High: 0, Medium: 1, Low: 2 };

const SOURCE_ICON = {
  Gmail: { icon: Mail, color: "text-red-400" },
  WhatsApp: { icon: MessageCircle, color: "text-green-400" },
  "Invoice Upload": { icon: FileText, color: "text-yellow-400" },
};

export default function DashboardPage() {
  const { cards, loading, addCards } = useCards();

  const pending = cards.filter((c) => c.status !== "Done");
  const urgent = pending.filter((c) => c.priority === "High").length;
  const payments = pending.filter((c) => ["Invoice", "Payment"].includes(c.category)).length;
  const quotations = pending.filter((c) => c.category === "Quotation").length;
  const enquiries = pending.filter((c) => c.category === "Customer Request").length;
  const estMinutes = urgent * 8 + Math.max(0, pending.length - urgent) * 4;

  // Source counts for the morning brief
  const gmailCount = cards.filter((c) => c.source === "Gmail").length;
  const waCount = cards.filter((c) => c.source === "WhatsApp").length;
  const invoiceCount = cards.filter((c) => c.source === "Invoice Upload").length;

  // Top 3 focus items
  const focusItems = [...pending]
    .sort((a, b) => FOCUS_RANK[a.priority] - FOCUS_RANK[b.priority])
    .slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* ── AI Morning Brief ── */}
      <section className="animate-slideUp overflow-hidden rounded-card border border-border bg-card">
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-accent via-blue-400 to-accent/50" />

        <div className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-btn bg-accent/15">
                  <Zap size={14} className="text-accent" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                  AI Morning Brief
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold text-white">
                {greeting}, Raj 👋
              </h1>
              <p className="mt-1 text-sm text-muted">
                I reviewed your business activity. Here's what needs your attention today.
              </p>
            </div>
            {estMinutes > 0 && (
              <div className="hidden shrink-0 rounded-btn border border-accent/20 bg-accent/5 px-4 py-3 text-center sm:block">
                <p className="text-xl font-bold text-accent">~{estMinutes}m</p>
                <p className="text-[10px] text-muted">est. work</p>
              </div>
            )}
          </div>

          {/* Stats row */}
          {cards.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {gmailCount > 0 && (
                <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1.5">
                  <Mail size={12} className="text-red-400" />
                  <span className="text-xs font-medium text-red-300">{gmailCount} Gmail</span>
                </div>
              )}
              {waCount > 0 && (
                <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1.5">
                  <MessageCircle size={12} className="text-green-400" />
                  <span className="text-xs font-medium text-green-300">{waCount} WhatsApp</span>
                </div>
              )}
              {invoiceCount > 0 && (
                <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5">
                  <FileText size={12} className="text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-300">{invoiceCount} Invoices</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-3 py-1.5">
                <TrendingUp size={12} className="text-accent" />
                <span className="text-xs font-medium text-accent">{cards.length} Action Cards · {urgent} urgent</span>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="my-5 border-t border-border" />

          {/* Today's Focus */}
          {focusItems.length > 0 && (
            <div className="mb-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Today's Focus</p>
              <div className="space-y-2">
                {focusItems.map((card, i) => (
                  <div key={card.id} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-accent">
                      {i + 1}
                    </span>
                    <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                      <p className="truncate text-sm text-slate-200">{card.title}</p>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${card.priority === "High"
                          ? "bg-danger/15 text-danger"
                          : card.priority === "Medium"
                            ? "bg-warning/15 text-warning"
                            : "bg-success/15 text-success"
                        }`}>
                        {card.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="mb-5 border-t border-border" />

          {/* Sync buttons */}
          <SyncButtons onSynced={addCards} />
        </div>
      </section>

      {/* ── KPI Cards ── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={AlertCircle} label="Urgent Actions" value={urgent} tone="danger" />
        <KpiCard icon={Clock3} label="Supplier Quotations" value={quotations} tone="warning" />
        <KpiCard icon={Wallet} label="Pending Payments" value={payments} tone="accent" />
        <KpiCard icon={Truck} label="Customer Enquiries" value={enquiries} tone="success" />
      </section>

      {/* ── Pending count strip ── */}
      {!loading && (
        <section className="animate-fadeIn flex items-center justify-between rounded-card border border-border bg-card px-6 py-4">
          <p className="text-sm text-muted">
            Total Pending Actions:{" "}
            <span className="font-semibold text-white">{pending.length}</span>
          </p>
          <a
            href="/action-center"
            className="text-xs font-medium text-accent hover:underline"
          >
            View all →
          </a>
        </section>
      )}
    </div>
  );
}
