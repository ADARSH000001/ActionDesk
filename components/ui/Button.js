"use client";

import { Loader2 } from "lucide-react";

/**
 * Button — design-system button with variants and sizes.
 *
 * Props:
 *   variant   "primary" | "secondary" | "ghost" | "danger" | "success"
 *   size      "sm" | "md" | "lg"
 *   loading   boolean
 *   icon      ReactNode (optional leading icon)
 *   children  ReactNode
 *   ...rest   forwarded to <button>
 */
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className = "",
  disabled,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-btn transition-all focus-visible:outline-accent select-none shrink-0";

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-light hover:shadow-glow-sm active:scale-[0.97] disabled:opacity-50",
    secondary:
      "border border-border bg-surface text-slate-200 hover:bg-elevated hover:border-accent/30 active:scale-[0.97] disabled:opacity-50",
    ghost:
      "text-muted hover:bg-white/5 hover:text-slate-200 active:scale-[0.97] disabled:opacity-40",
    danger:
      "border border-danger/30 bg-danger/10 text-danger hover:bg-danger/20 active:scale-[0.97] disabled:opacity-50",
    success:
      "border border-success/30 bg-success/10 text-success hover:bg-success/20 active:scale-[0.97] disabled:opacity-50",
  };

  const sizes = {
    sm: "h-7 px-3 text-xs",
    md: "h-9 px-4 text-sm",
    lg: "h-10 px-5 text-sm",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
