"use client";

import { useState } from "react";
import { Mail, MessageCircle, Check } from "lucide-react";

const GMAIL_STEPS = [
  "Connecting to Gmail...",
  "Reading messages...",
  "Understanding business context...",
  "Generating Action Cards...",
  "Done ✓",
];

const WHATSAPP_STEPS = [
  "Connecting to WhatsApp...",
  "Reading messages...",
  "Understanding business context...",
  "Generating Action Cards...",
  "Done ✓",
];

export default function SyncButtons({ onSynced }) {
  const [loading, setLoading] = useState(null); // "gmail" | "whatsapp" | null
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState(null);

  async function sync(kind) {
    setLoading(kind);
    setStepIndex(0);
    setError(null);

    // Run the real API call in parallel with the animation
    const apiPromise = fetch(`/api/sync-${kind}`, { method: "POST" })
      .then((res) => res.json())
      .catch(() => ({ cards: [] }));

    // Animate through steps
    const steps = kind === "gmail" ? GMAIL_STEPS : WHATSAPP_STEPS;
    const delays = [400, 550, 650, 500, 400];
    for (let i = 1; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, delays[i - 1]));
      setStepIndex(i);
    }

    // Wait for real API to finish then update cards
    try {
      const data = await apiPromise;
      if (data.cards) onSynced?.(data.cards);
    } catch (e) {
      setError(e.message);
    }

    // Brief pause to show "Done ✓" then clear
    await new Promise((r) => setTimeout(r, 600));
    setLoading(null);
    setStepIndex(0);
  }

  const steps = loading === "gmail" ? GMAIL_STEPS : WHATSAPP_STEPS;
  const isDone = stepIndex === steps.length - 1;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => sync("gmail")}
          disabled={loading !== null}
          className="flex items-center gap-2 rounded-btn border border-border bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:border-accent/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Mail size={15} className="text-red-400" />
          Sync Gmail
        </button>
        <button
          onClick={() => sync("whatsapp")}
          disabled={loading !== null}
          className="flex items-center gap-2 rounded-btn border border-border bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:border-accent/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MessageCircle size={15} className="text-green-400" />
          Sync WhatsApp
        </button>
      </div>

      {loading && (
        <div className="animate-fadeIn flex items-center gap-3 rounded-btn border border-accent/20 bg-accent/5 px-4 py-3">
          {isDone ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20">
              <Check size={12} className="text-success" />
            </span>
          ) : (
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-25" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
          )}
          <div className="flex-1">
            <p className={`text-sm font-medium transition-colors ${isDone ? "text-success" : "text-accent"}`}>
              {steps[stepIndex]}
            </p>
            {!isDone && (
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-1 rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                />
              </div>
            )}
          </div>
          <span className="text-xs text-muted">
            {stepIndex + 1}/{steps.length}
          </span>
        </div>
      )}

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
