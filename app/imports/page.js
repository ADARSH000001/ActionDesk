"use client";

import { useState } from "react";
import { FileText, MessageSquareText, Loader2, Mic, Sparkles, ArrowRight } from "lucide-react";
import { useCards } from "@/lib/useCards";
import SyncButtons from "@/components/SyncButtons";
import ActionCard from "@/components/ActionCard";

export default function ImportsPage() {
  const { cards, addCards, updateCard } = useCards();
  const recentImports = cards.slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-white">Imports</h1>
        <p className="mt-1 text-sm text-muted">
          Bring in an email, WhatsApp message, invoice, or voice note. Everything becomes an Action Card.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Sync channels */}
        <div className="rounded-card border border-border bg-card p-5">
          <p className="text-sm font-semibold text-white">Sync a Channel</p>
          <p className="mt-1 text-xs text-muted">Connector is simulated; AI extraction is real.</p>
          <div className="mt-4">
            <SyncButtons onSynced={addCards} />
          </div>
        </div>

        <PasteText onCreated={(card) => addCards([card])} />
        <InvoiceUpload onCreated={(card) => addCards([card])} />

        {/* Voice Note – Coming in Round 2 */}
        <div className="rounded-card border border-border bg-gradient-to-br from-card to-sidebar p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-btn bg-purple-500/15">
              <Mic size={14} className="text-purple-400" />
            </div>
            <p className="text-sm font-semibold text-white">Voice Note</p>
          </div>

          <div className="rounded-btn border border-amber-500/20 bg-amber-500/5 px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🚧</span>
              <div>
                <p className="text-xs font-semibold text-amber-300">Coming in Round 2</p>
                <p className="text-[11px] text-muted">Powered by Groq Whisper</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Record voice memos and ActionDesk will transcribe, understand, and automatically generate Action Cards — completely hands-free.
          </p>

          <div className="mt-4 space-y-2">
            {["Real-time voice transcription", "Groq Whisper integration", "Auto Action Card generation"].map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-[11px] text-muted">
                <Sparkles size={10} className="text-purple-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-1 text-[11px] text-purple-400/60">
            <span>Future Roadmap</span>
            <ArrowRight size={10} />
          </div>
        </div>
      </div>

      {/* Recently imported */}
      {recentImports.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-white">Just Imported</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {recentImports.map((card) => (
              <ActionCard key={card.id} card={card} onUpdate={updateCard} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Panel({ icon: Icon, iconColor = "text-accent", title, hint, children }) {
  return (
    <div className="rounded-card border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-btn bg-accent/10">
          <Icon size={14} className={iconColor} />
        </div>
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <p className="text-xs text-muted mb-4">{hint}</p>
      {children}
    </div>
  );
}

function PasteText({ onCreated }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source: "Manual" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Extraction failed");
      onCreated(data.card);
      setText("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Panel icon={MessageSquareText} title="Paste Email or Message" hint="Runs through the real Groq extraction pipeline.">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Paste the raw text of an email, WhatsApp message, or note…"
        className="w-full rounded-input border border-border bg-white/[0.02] px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-muted focus-visible:outline-accent transition-colors focus:border-accent/40"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={submit}
          disabled={loading || !text.trim()}
          className="flex items-center gap-2 rounded-btn bg-accent px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
        >
          {loading && <Loader2 size={13} className="animate-spin" />}
          Extract Action
        </button>
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    </Panel>
  );
}

function InvoiceUpload({ onCreated }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload-invoice", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onCreated(data.card);
      setFile(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Panel icon={FileText} iconColor="text-yellow-400" title="Upload Invoice" hint="Accepts PDF or plain text files. AI extracts payment action automatically.">
      <input
        type="file"
        accept=".pdf,.txt"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full text-xs text-muted file:mr-3 file:rounded-btn file:border-0 file:bg-white/5 file:px-3 file:py-2 file:text-xs file:text-slate-200 file:cursor-pointer"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={submit}
          disabled={loading || !file}
          className="flex items-center gap-2 rounded-btn bg-accent px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
        >
          {loading && <Loader2 size={13} className="animate-spin" />}
          Extract Invoice
        </button>
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    </Panel>
  );
}
