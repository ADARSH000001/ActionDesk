"use client";

import { useMemo, useState } from "react";
import { useCards } from "@/lib/useCards";
import ActionCard, { ActionCardSkeleton } from "@/components/ActionCard";
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

  const activeFilters = [category, priority, status].filter((f) => f !== "All" && f !== "Pending").length +
    (status === "Pending" ? 0 : 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Action Center</h1>
        <p className="mt-1 text-sm text-muted">Every action, from every source, in one place.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-muted">
          <SlidersHorizontal size={13} />
          <span>Filter</span>
          {activeFilters > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              {activeFilters}
            </span>
          )}
        </div>
        <Select value={category} onChange={setCategory} options={["All", ...CATEGORIES]} />
        <Select value={priority} onChange={setPriority} options={["All", ...PRIORITIES]} />
        <Select value={status} onChange={setStatus} options={["All", "Pending", "In Progress", "Done"]} />
        {(category !== "All" || priority !== "All" || status !== "Pending") && (
          <button
            onClick={() => { setCategory("All"); setPriority("All"); setStatus("Pending"); }}
            className="text-xs text-muted hover:text-slate-200 underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ActionCardSkeleton />
          <ActionCardSkeleton />
          <ActionCardSkeleton />
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <EmptyState
          icon={<Inbox size={24} />}
          title="Nothing here"
          message="Try a different filter, or import something from the Imports page."
        />
      )}

      {/* Cards grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((card) => (
            <ActionCard key={card.id} card={card} onUpdate={updateCard} />
          ))}
        </div>
      )}
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
