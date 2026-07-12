"use client";

import { Inbox } from "lucide-react";

/**
 * EmptyState — reusable empty/zero-data placeholder.
 *
 * Props:
 *   icon      ReactNode (default Inbox from lucide)
 *   title     string
 *   message   string
 *   action    ReactNode — optional CTA button
 */
export default function EmptyState({ icon, title = "Nothing here", message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-border bg-surface px-8 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-muted">
        {icon ?? <Inbox size={24} />}
      </div>
      <p className="mt-4 text-base font-semibold text-slate-200">{title}</p>
      {message && (
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{message}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
