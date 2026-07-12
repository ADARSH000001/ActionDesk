"use client";

import { useState } from "react";
import { Plus, User, ChevronDown, Bell } from "lucide-react";
import { ImportModal } from "@/components/ui/Modal";
import SearchBar from "@/components/ui/SearchBar";

export default function Header() {
  const [importOpen, setImportOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-sidebar/80 px-6 backdrop-blur-sm">

        {/* ── Search ──────────────────────────────────────────── */}
        <div className="flex-1 max-w-md">
          <SearchBar
            placeholder="Search customers, suppliers, invoices, or ask a question..."
            className="w-full"
          />
        </div>

        {/* ── Right Actions ────────────────────────────────────── */}
        <div className="flex items-center gap-2">

          {/* + Import button */}
          <button
            onClick={() => setImportOpen(true)}
            id="header-import-btn"
            className="hidden sm:flex items-center gap-1.5 rounded-btn border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-slate-300 transition-all duration-150 hover:border-accent/40 hover:bg-elevated hover:text-white"
          >
            <Plus size={13} />
            Import
          </button>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="relative flex h-8 w-8 items-center justify-center rounded-btn text-muted transition-colors hover:bg-white/5 hover:text-slate-200"
          >
            <Bell size={16} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              id="header-profile-btn"
              className="flex items-center gap-2 rounded-btn px-2 py-1 transition-colors hover:bg-white/5"
              aria-label="Open profile menu"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent/70 to-accent text-xs font-bold text-white shadow-glow-sm">
                R
              </div>
              <ChevronDown
                size={13}
                className={`text-muted transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1.5 w-52 rounded-card border border-border bg-elevated p-1 shadow-elevated animate-slideDown">
                  <div className="border-b border-border px-3 py-2 mb-1">
                    <p className="text-xs font-semibold text-slate-200">Raj Patel</p>
                    <p className="text-[11px] text-muted">raj@furniture.co</p>
                  </div>
                  {PROFILE_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      className="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-xs text-muted transition-colors hover:bg-white/5 hover:text-slate-200"
                    >
                      <item.icon size={13} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Import modal */}
      <ImportModal open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  );
}

import { Settings, LogOut, HelpCircle } from "lucide-react";

const PROFILE_ITEMS = [
  { label: "Settings",   icon: Settings   },
  { label: "Help",       icon: HelpCircle },
  { label: "Sign out",   icon: LogOut     },
];
