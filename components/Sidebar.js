"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  Inbox,
  BrainCircuit,
  BarChart3,
  Settings,
  Plus,
  Zap,
  X,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImportModal } from "@/components/ui/Modal";

/* ── Navigation definition ───────────────────────────────────── */
const NAV_ITEMS = [
  { href: "/",                 label: "Morning Brief",       icon: Sun },
  { href: "/action-center",   label: "Action Center",       icon: Inbox },
  { href: "/business-memory", label: "Business Memory",     icon: BrainCircuit },
  { href: "/insights",        label: "Business Intelligence", icon: BarChart3 },
  { href: "/settings",        label: "Settings",            icon: Settings },
];

/* ── Sidebar ─────────────────────────────────────────────────── */
export default function Sidebar() {
  const pathname = usePathname();
  const [importOpen, setImportOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-btn border border-border bg-sidebar text-muted transition-colors hover:text-slate-200 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence initial={false}>
        {/* Desktop: always visible */}
        <aside
          className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-border bg-sidebar"
        >
          <SidebarContent
            pathname={pathname}
            onImport={() => setImportOpen(true)}
          />
        </aside>
      </AnimatePresence>

      {/* Mobile: slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            key="sidebar-drawer"
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 z-50 flex h-full w-[220px] flex-col border-r border-border bg-sidebar lg:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 rounded-btn p-1.5 text-muted hover:text-slate-200"
              aria-label="Close navigation"
            >
              <X size={16} />
            </button>
            <SidebarContent
              pathname={pathname}
              onImport={() => { setImportOpen(true); setMobileOpen(false); }}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Import modal */}
      <ImportModal open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  );
}

/* ── Inner content (shared between desktop & mobile) ─────────── */
function SidebarContent({ pathname, onImport }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-btn bg-accent/15 text-accent">
          <Zap size={15} strokeWidth={2.5} />
        </div>
        <span className="text-[14px] font-semibold tracking-tight text-white">
          ActionDesk
        </span>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-[#13192F]" />

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 pt-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-subtle">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item group relative flex items-center gap-3 rounded-btn px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                active
                  ? "nav-active bg-accent/10 text-accent"
                  : "text-muted hover:bg-white/[0.04] hover:text-slate-300"
              }`}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2 : 1.75}
                className="shrink-0 transition-transform group-hover:scale-105"
              />
              <span>{item.label}</span>
              {active && (
                <motion.span
                  layoutId="sidebar-active-dot"
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[#13192F] px-3 py-4 space-y-2">
        {/* Import button */}
        <button
          onClick={onImport}
          className="group flex w-full items-center gap-2.5 rounded-btn border border-dashed border-border px-3 py-2.5 text-[13px] font-medium text-muted transition-all duration-150 hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
        >
          <Plus size={15} className="transition-transform group-hover:rotate-90 duration-200" />
          Import
        </button>

        {/* Workspace info */}
        <div className="px-1 pt-1">
          <p className="text-[11px] font-semibold text-slate-400">Furniture Business</p>
          <p className="text-[11px] text-subtle">Free Plan</p>
        </div>
      </div>
    </div>
  );
}
