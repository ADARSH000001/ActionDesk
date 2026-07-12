"use client";

import SearchBar from "@/components/ui/SearchBar";

const FILTER_CHIPS = [
  { id: "all",       label: "All" },
  { id: "customer",  label: "Customers" },
  { id: "supplier",  label: "Suppliers" },
  { id: "invoice",   label: "Invoices" },
  { id: "complaint", label: "Complaints" },
];

/**
 * MemorySearch — search input + filter chips for Business Memory.
 *
 * Props:
 *   query      string
 *   onQuery    (q: string) => void
 *   filter     string  ("all" | "customer" | "supplier" | "invoice" | "complaint")
 *   onFilter   (f: string) => void
 */
export default function MemorySearch({ query, onQuery, filter, onFilter }) {
  return (
    <div className="space-y-3">
      <SearchBar
        placeholder="Search by company, title, tags, or AI learning..."
        value={query}
        onChange={onQuery}
        size="md"
        className="w-full"
      />

      <div className="flex flex-wrap gap-2">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.id}
            onClick={() => onFilter(chip.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              filter === chip.id
                ? "bg-accent text-white shadow-glow-sm"
                : "border border-border bg-surface text-muted hover:border-accent/30 hover:text-slate-200"
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
