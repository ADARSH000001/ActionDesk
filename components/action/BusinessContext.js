"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RISK_CONFIG } from "@/lib/demoData";
import {
  TrendingUp, Shield, ChevronDown,
  Users, Phone, MessageCircle, Calendar, User,
  Clock, CreditCard, Package,
} from "lucide-react";

/**
 * BusinessContext — "WHY THIS MATTERS" (flat accent row) + a collapsible
 * "Business Details" panel. Both are controlled by the same `expanded`
 * flag owned by ActionCard2, so one toggle reveals everything at once —
 * no truncated business information left behind after expanding.
 *
 * Props:
 *   card              ActionCard (with extended model fields)
 *   expanded          boolean — controlled by parent
 *   onToggleExpanded  () => void
 */
export default function BusinessContext({ card, expanded, onToggleExpanded }) {
  const risk = card.risk ?? "Medium";
  const rCfg = RISK_CONFIG[risk] ?? RISK_CONFIG.Medium;
  const value = card.businessValue;
  const ctx = card.businessContext || card.why_it_matters;

  const details = card.details ?? {};

  const hasDetails = !!(risk || value || card.customerSince || details.contact
    || details.lastConversation || details.previousOrders || details.paymentTerms
    || details.preferredComm || details.expectedDelivery || details.owner || details.notes);

  if (!ctx && !hasDetails) return null;

  return (
    <div className="space-y-2">
      {/* ── WHY THIS MATTERS ── */}
      {ctx && (
        <div className="border-l-2 border-accent/60 pl-3">
          <span className="block text-[9px] font-bold uppercase tracking-widest text-accent mb-1">
            Why This Matters
          </span>
          <p
            className={`text-[12px] leading-relaxed text-slate-100 font-medium ${expanded ? "" : "line-clamp-2"}`}
            title={expanded ? undefined : ctx}
          >
            {ctx}
          </p>
        </div>
      )}

      {/* ── Collapsible Business Details ──────────────────── */}
      {hasDetails && (
        <div className={ctx ? "border-t border-border/40 pt-2" : ""}>
          <button
            onClick={onToggleExpanded}
            className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-muted hover:text-slate-300 transition-colors"
          >
            <ChevronDown
              size={11}
              className={`transition-transform duration-300 ease-out ${expanded ? "rotate-180" : ""}`}
            />
            Business Details
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2, ease: "easeOut" },
                }}
                className="overflow-hidden"
              >
                <div className="mt-2.5 grid grid-cols-2 gap-x-5 gap-y-2.5 pb-1">
                  {/* Row 1 */}
                  <DetailRow icon={Shield} label="Risk" value={risk} valueClass={rCfg.color} />
                  {value && (
                    <DetailRow
                      icon={TrendingUp}
                      label={value.label || "Deal Value"}
                      value={value.amount}
                      valueClass="text-success"
                    />
                  )}

                  {/* Row 2 */}
                  {card.customerSince && (
                    <DetailRow icon={Users} label="Customer Since" value={card.customerSince} />
                  )}
                  {details.previousOrders != null && (
                    <DetailRow icon={Package} label="Previous Orders" value={details.previousOrders} />
                  )}

                  {/* Row 3 */}
                  <DetailRow icon={MessageCircle} label="Preferred Communication" value={details.preferredComm} />
                  <DetailRow icon={CreditCard} label="Payment Terms" value={details.paymentTerms} />

                  {/* Row 4 */}
                  <DetailRow icon={Calendar} label="Expected Delivery" value={details.expectedDelivery} />
                  <DetailRow icon={User} label="Internal Owner" value={details.owner} />

                  {/* Row 5 */}
                  <DetailRow icon={Phone} label="Contact Person" value={details.contact} />
                  <DetailRow icon={Clock} label="Last Contact" value={details.lastConversation} />

                  {/* Notes — always full width */}
                  {details.notes && (
                    <div className="col-span-2 mt-0.5">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-muted">Notes</span>
                      <p className="text-[10px] leading-relaxed text-slate-400 mt-0.5">{details.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function DetailRow({ icon: Icon, label, value, valueClass = "text-slate-300" }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-1.5 min-w-0">
      <Icon size={10} className="mt-0.5 shrink-0 text-muted/70" />
      <div className="min-w-0">
        <span className="block text-[9px] font-semibold uppercase tracking-wider text-muted">{label}</span>
        <span className={`block text-[10px] font-medium truncate ${valueClass}`}>{value}</span>
      </div>
    </div>
  );
}