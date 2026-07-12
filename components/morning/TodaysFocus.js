"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const FOCUS_RANK = { High: 0, Medium: 1, Low: 2 };

const PRIORITY_DOT = {
  High:   "bg-danger",
  Medium: "bg-warning",
  Low:    "bg-success",
};

const PRIORITY_PILL = {
  High:   "bg-danger/10 text-danger",
  Medium: "bg-warning/10 text-warning",
  Low:    "bg-success/10 text-success",
};

function formatDeadline(deadline) {
  if (!deadline) return null;
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return deadline;
  const today = new Date();
  const diff = Math.round((d - new Date(today.toDateString())) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  return `In ${diff}d`;
}

/**
 * TodaysFocus — max 5 items, priority-sorted.
 *
 * Props:
 *   cards  ActionCard[]
 */
export default function TodaysFocus({ cards }) {
  const router = useRouter();

  const items = [...cards]
    .filter((c) => c.status !== "Done")
    .sort((a, b) => FOCUS_RANK[a.priority] - FOCUS_RANK[b.priority])
    .slice(0, 5);

  if (items.length === 0) return null;

  return (
    <div>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted">
        Today's Focus
      </p>

      <div className="space-y-1">
        {items.map((card, i) => {
          const deadline = formatDeadline(card.deadline);
          const isOverdue = deadline?.includes("overdue");

          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
              onClick={() => router.push("/action-center")}
              className="group flex w-full items-center gap-3 rounded-btn px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
            >
              {/* Priority dot */}
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${PRIORITY_DOT[card.priority] ?? "bg-muted"}`}
              />

              {/* Title */}
              <span className="flex-1 truncate text-[13px] text-slate-200 group-hover:text-white transition-colors">
                {card.title}
              </span>

              {/* Deadline */}
              {deadline && (
                <span
                  className={`flex shrink-0 items-center gap-1 text-[11px] font-medium ${
                    isOverdue ? "text-danger" : deadline === "Today" ? "text-warning" : "text-muted"
                  }`}
                >
                  <Clock size={10} />
                  {deadline}
                </span>
              )}

              {/* Priority badge */}
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  PRIORITY_PILL[card.priority] ?? ""
                }`}
              >
                {card.priority}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
