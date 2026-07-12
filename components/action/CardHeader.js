"use client";

import { CATEGORY_STYLE, SOURCE_STYLE } from "@/lib/demoData";
import { Building2 } from "lucide-react";

const PRIORITY_STYLE = {
  High: "bg-danger/10 text-danger border-danger/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-success/10 text-success border-success/20",
};

/**
 * CardHeader — title + badge row (company, category, source, priority).
 * Priority is back to a pill (left accent border removed per feedback).
 * Title wraps naturally instead of truncating — no information loss.
 *
 * Props:
 *   card  ActionCard (with extended model fields)
 */
export default function CardHeader({ card }) {
  const catStyle = CATEGORY_STYLE[card.category] ?? "bg-white/5 text-muted border-white/10";
  const srcStyle = SOURCE_STYLE[card.source] ?? SOURCE_STYLE.Manual;
  const priStyle = PRIORITY_STYLE[card.priority] ?? PRIORITY_STYLE.Medium;

  return (
    <div className="space-y-1.5">
      {/* Badge row */}
      <div className="flex flex-wrap items-center gap-1.5">
        {card.company && (
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/8 px-2.5 py-1 text-[10px] font-semibold text-accent">
            <Building2 size={9} />
            {card.company}
          </span>
        )}
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${catStyle}`}>
          {card.category}
        </span>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${srcStyle.bg} ${srcStyle.text} ${srcStyle.border}`}>
          {card.source}
        </span>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${priStyle}`}>
          {card.priority} Priority
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-bold leading-snug text-white">
        {card.title}
      </h3>
    </div>
  );
}