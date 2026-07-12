"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command } from "lucide-react";
import { useCards } from "@/lib/useCards";
import SearchResults from "./SearchResults";

/**
 * GlobalSearch — full-screen overlay search.
 *
 * Props:
 *   open     boolean
 *   onClose  () => void
 */
export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState("");
  const { cards } = useCards();
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery("");
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          style={{ background: "rgba(5,7,26,0.88)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl overflow-hidden rounded-dialog border border-border bg-elevated shadow-modal"
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search size={16} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search actions, companies, categories, tags..."
                className="flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-muted"
              />
              <div className="flex items-center gap-2">
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="rounded p-1 text-muted transition-colors hover:text-slate-200"
                  >
                    <X size={13} />
                  </button>
                )}
                <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted sm:inline">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Results */}
            <SearchResults query={query} cards={cards} onClose={onClose} />

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-border px-4 py-2">
              <div className="flex items-center gap-3 text-[10px] text-subtle">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-surface px-1.5 py-0.5">↵</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-surface px-1.5 py-0.5">ESC</kbd>
                  Close
                </span>
              </div>
              <span className="text-[10px] text-subtle">
                {cards.length} action{cards.length !== 1 ? "s" : ""} indexed
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
