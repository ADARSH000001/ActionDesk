"use client";

import { useMemo, useState } from "react";
import { useCards } from "@/lib/useCards";
import ActionCard2 from "@/components/action/ActionCard2";
import { ActionCardSkeleton } from "@/components/ActionCard";
import { CATEGORIES, PRIORITIES } from "@/lib/schema";
import { SlidersHorizontal, Inbox } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

export default function ActionCenterPage() {
  const { cards, loading, updateCard } = useCards();
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("Pending");

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (priority !== "All" && c.priority !== priority) return false;
      if (status !== "All" && c.status !== status) return false;
      return true;
    });
  }, [cards, category, priority, status]);

  const activeFilters =
    [category, priority].filter((f) => f !== "All").length + (status === "Pending" ? 0 : 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Action Center</h1>
        <p className="mt-1 text-sm text-muted">Your executive operations console. Every action, from every source.</p>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted">
          <SlidersHorizontal size={13} />
          <span>Filters</span>
          {activeFilters > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              {activeFilters}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <FilterField label="Category">
            <Select value={category} onChange={setCategory} options={["All", ...CATEGORIES]} />
          </FilterField>
          <FilterField label="Priority">
            <Select value={priority} onChange={setPriority} options={["All", ...PRIORITIES]} />
          </FilterField>
          <FilterField label="Status">
            <Select value={status} onChange={setStatus} options={["All", "Pending", "In Progress", "Done"]} />
          </FilterField>

          {(category !== "All" || priority !== "All" || status !== "Pending") && (
            <button
              onClick={() => { setCategory("All"); setPriority("All"); setStatus("Pending"); }}
              className="mb-2 text-xs text-muted hover:text-slate-200 underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Loading skeletons — same column layout as real content */}
      {/* Loading skeletons */}
      {loading && (
        <div className="columns-1 lg:columns-2 gap-5">
          <div className="break-inside-avoid mb-5"><ActionCardSkeleton /></div>
          <div className="break-inside-avoid mb-5"><ActionCardSkeleton /></div>
          <div className="break-inside-avoid mb-5"><ActionCardSkeleton /></div>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <EmptyState
          icon={<Inbox size={24} />}
          title="Nothing here"
          message="Try a different filter, or import something from the Imports page."
        />
      )}

      {/* Cards — CSS multi-column masonry so expanding one card never
          stretches its neighbor (no shared grid row, no JS height math) */}
      {!loading && filtered.length > 0 && (
        <div className="columns-1 lg:columns-2 gap-5 pt-2">
          {filtered.map((card) => (
            <div key={card.id} className="break-inside-avoid mb-5">
              <ActionCard2 card={card} onUpdate={updateCard} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</span>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-input border border-border bg-card px-3 py-2 text-sm text-slate-200 outline-none transition-colors hover:border-accent/30 focus-visible:outline-accent"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}