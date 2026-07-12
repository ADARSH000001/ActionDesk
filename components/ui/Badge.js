"use client";

/**
 * Badge — design-system badge/pill.
 *
 * Props:
 *   tone      "accent" | "danger" | "warning" | "success" | "muted" |
 *             "gmail" | "whatsapp" | "invoice" | "voice" | "manual"
 *   size      "sm" | "md"
 *   dot       boolean — show a leading dot
 *   children  ReactNode
 */
export default function Badge({ tone = "muted", size = "sm", dot = false, children, className = "" }) {
  const tones = {
    accent:    "bg-accent/10 text-accent border-accent/20",
    danger:    "bg-danger/10 text-danger border-danger/20",
    warning:   "bg-warning/10 text-warning border-warning/20",
    success:   "bg-success/10 text-success border-success/20",
    muted:     "bg-white/5 text-muted border-white/8",
    gmail:     "bg-red-500/10 text-red-400 border-red-500/20",
    whatsapp:  "bg-green-500/10 text-green-400 border-green-500/20",
    invoice:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    voice:     "bg-purple-500/10 text-purple-400 border-purple-500/20",
    manual:    "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  const dotColors = {
    accent:   "bg-accent",
    danger:   "bg-danger",
    warning:  "bg-warning",
    success:  "bg-success",
    muted:    "bg-muted",
    gmail:    "bg-red-400",
    whatsapp: "bg-green-400",
    invoice:  "bg-yellow-400",
    voice:    "bg-purple-400",
    manual:   "bg-slate-400",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColors[tone]}`} />
      )}
      {children}
    </span>
  );
}
