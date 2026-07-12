"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Accessible animated modal.
 *
 * Props:
 *   open      boolean
 *   onClose   () => void
 *   title     string
 *   children  ReactNode
 *   size      "sm" | "md" | "lg"   (default "md")
 */
export default function Modal({ open, onClose, title, children, size = "md" }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(5,7,26,0.85)" }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${sizeClasses[size]} rounded-dialog border border-border bg-elevated shadow-modal`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 id="modal-title" className="text-base font-semibold text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="rounded-btn p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-slate-200"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * ImportModal — placeholder that will be built out in a future sprint.
 */
export function ImportModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Import Data" size="md">
      <div className="space-y-6">
        <p className="text-sm text-muted leading-relaxed">
          Connect your sources to automatically extract and organise business actions.
        </p>

        {/* Source tiles */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {IMPORT_SOURCES.map((src) => (
            <button
              key={src.label}
              disabled
              className="flex items-center gap-4 rounded-card border border-border bg-surface p-4 text-left opacity-60 transition-colors hover:border-accent/30 hover:bg-elevated hover:opacity-100 disabled:cursor-not-allowed"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-btn text-lg ${src.bg}`}>
                {src.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-200">{src.label}</p>
                <p className="mt-0.5 text-xs text-muted">{src.description}</p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted">
          Import sources will be enabled in the next sprint.
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-btn bg-accent px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-glow-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </Modal>
  );
}

const IMPORT_SOURCES = [
  { label: "Gmail",        description: "Sync emails & threads",       icon: "✉️", bg: "bg-red-500/10" },
  { label: "WhatsApp",     description: "Import business chats",       icon: "💬", bg: "bg-green-500/10" },
  { label: "Invoice PDF",  description: "Upload & parse invoices",     icon: "📄", bg: "bg-yellow-500/10" },
  { label: "Voice Note",   description: "Transcribe voice memos",      icon: "🎙️", bg: "bg-purple-500/10" },
];
