"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Plus, ChevronDown, Settings, LogOut, HelpCircle, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImportModal } from "@/components/ui/Modal";
import GlobalSearch from "@/components/search/GlobalSearch";
import NotificationCenter from "@/components/notifications/NotificationCenter";

export default function Header() {
  const [importOpen, setImportOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [profileCoords, setProfileCoords] = useState({ top: 0, right: 0 });

  const profileBtnRef = useRef(null);
  const profilePanelRef = useRef(null);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Compute position of profile dropdown from button rect
  function openProfile() {
    if (profileBtnRef.current) {
      const rect = profileBtnRef.current.getBoundingClientRect();
      setProfileCoords({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
    setProfileOpen(true);
  }

  function toggleProfile() {
    if (profileOpen) {
      setProfileOpen(false);
    } else {
      openProfile();
    }
  }

  // Close profile on outside click
  useEffect(() => {
    if (!profileOpen) return;
    function handler(e) {
      if (
        profilePanelRef.current &&
        !profilePanelRef.current.contains(e.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  // Reposition on resize
  useEffect(() => {
    if (!profileOpen) return;
    function onResize() {
      if (profileBtnRef.current) {
        const rect = profileBtnRef.current.getBoundingClientRect();
        setProfileCoords({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [profileOpen]);

  const profilePortal = (
    <AnimatePresence>
      {profileOpen && (
        <motion.div
          ref={profilePanelRef}
          key="profile-panel"
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            top: profileCoords.top,
            right: profileCoords.right,
            zIndex: 9999,
          }}
          className="w-52 rounded-card border border-border bg-elevated p-1 shadow-elevated"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-sidebar/80 px-6 backdrop-blur-sm">

        {/* ── Search bar (click → overlay) ─────────────────────── */}
        <div className="flex-1 max-w-md">
          <button
            onClick={() => setSearchOpen(true)}
            className="group flex h-9 w-full items-center gap-2 rounded-input border border-border bg-surface px-3 text-left transition-all hover:border-accent/40 hover:bg-elevated hover:shadow-glow-sm"
            aria-label="Open search"
          >
            <Search size={14} className="shrink-0 text-muted transition-colors group-hover:text-accent" />
            <span className="flex-1 text-sm text-muted">
              Search actions, companies, tags…
            </span>
            <kbd className="hidden rounded border border-border bg-elevated px-1.5 py-0.5 text-[10px] text-subtle sm:inline">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ── Right Actions ──────────────────────────────────────── */}
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

          {/* Notification Center */}
          <NotificationCenter />

          {/* Profile button */}
          <button
            ref={profileBtnRef}
            onClick={toggleProfile}
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
        </div>
      </header>

      {/* Profile dropdown — portaled to body, z-index 9999 */}
      {typeof window !== "undefined" && createPortal(profilePortal, document.body)}

      {/* Global Search overlay */}
      <GlobalSearch open={searchOpen} onClose={closeSearch} />

      {/* Import modal */}
      <ImportModal open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  );
}

const PROFILE_ITEMS = [
  { label: "Settings", icon: Settings  },
  { label: "Help",     icon: HelpCircle },
  { label: "Sign out", icon: LogOut    },
];
