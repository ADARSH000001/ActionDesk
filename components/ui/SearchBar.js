"use client";

import { Search } from "lucide-react";

/**
 * SearchBar — standalone search input.
 *
 * Props:
 *   placeholder  string
 *   value        string
 *   onChange     (val: string) => void
 *   onFocus      () => void
 *   className    string
 *   size         "sm" | "md"
 */
export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onFocus,
  className = "",
  size = "md",
}) {
  const heights = { sm: "h-8", md: "h-9" };
  const textSizes = { sm: "text-xs", md: "text-sm" };

  return (
    <div
      className={`group flex items-center gap-2 rounded-input border border-border bg-surface px-3 transition-all duration-200 focus-within:border-accent/40 focus-within:bg-elevated focus-within:shadow-glow-sm ${heights[size]} ${className}`}
    >
      <Search
        size={size === "sm" ? 13 : 14}
        className="shrink-0 text-muted transition-colors group-focus-within:text-accent"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        className={`w-full bg-transparent outline-none placeholder:text-muted ${textSizes[size]} text-slate-200`}
      />
    </div>
  );
}
