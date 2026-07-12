"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, MessageSquare, CreditCard, Truck, ArrowRight } from "lucide-react";

const QUICK_WINS = [
  {
    id:    "quotation",
    icon:  FileText,
    bg:    "bg-blue-500/10 text-blue-400",
    title: "Draft quotation",
    sub:   "Verma Enterprises showroom order",
  },
  {
    id:    "complaint",
    icon:  MessageSquare,
    bg:    "bg-danger/10 text-danger",
    title: "Reply to complaint",
    sub:   "Rakesh Traders — delivery delay",
  },
  {
    id:    "payment",
    icon:  CreditCard,
    bg:    "bg-warning/10 text-warning",
    title: "Payment reminder",
    sub:   "Invoice #INV-2291 · ₹48,500",
  },
  {
    id:    "supplier",
    icon:  Truck,
    bg:    "bg-success/10 text-success",
    title: "Supplier confirmation",
    sub:   "ABC Traders — teak wood panels",
  },
];

/**
 * QuickWins — right-panel list of quick actionable items.
 * Clicking navigates to /action-center.
 */
export default function QuickWins({ cards }) {
  const router = useRouter();

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted">
        Quick Wins
      </p>

      <div className="space-y-1">
        {QUICK_WINS.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
              onClick={() => router.push("/action-center")}
              className="group flex w-full items-center gap-3 rounded-btn px-2 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-btn ${item.bg}`}>
                <Icon size={13} strokeWidth={2} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors">
                  {item.title}
                </p>
                <p className="truncate text-[11px] text-muted">{item.sub}</p>
              </div>

              <ArrowRight
                size={13}
                className="shrink-0 text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
