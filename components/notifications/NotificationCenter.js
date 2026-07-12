"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck } from "lucide-react";
import { useNotifications } from "@/lib/notifications";
import NotificationItem from "./NotificationItem";

/**
 * NotificationCenter — bell button with animated dropdown.
 *
 * The dropdown is rendered via a React Portal attached to document.body so that
 * it always appears above every other element regardless of stacking contexts
 * created by backdrop-blur, transforms, or z-index on parent elements.
 */
export default function NotificationCenter() {
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  // Compute dropdown position from the bell button bounds
  function openPanel() {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen(true);
  }

  function toggle() {
    if (open) {
      setOpen(false);
    } else {
      openPanel();
    }
  }

  // Close on outside click (panel is portaled to body)
  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Recalculate on window resize to keep panel aligned
  useEffect(() => {
    if (!open) return;
    function onResize() {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setCoords({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          key="notif-panel"
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            top: coords.top,
            right: coords.right,
            zIndex: 9999,
          }}
          className="w-80 overflow-hidden rounded-card border border-border bg-elevated shadow-modal"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white">Notifications</p>
              {unreadCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-[11px] text-muted transition-colors hover:text-accent"
              >
                <CheckCheck size={12} />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-border/50">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell size={20} className="mx-auto mb-2 text-muted/40" />
                <p className="text-sm text-muted">No notifications yet.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onRead={(id) => { markRead(id); }}
                />
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Bell button */}
      <button
        ref={btnRef}
        onClick={toggle}
        className={`relative flex h-8 w-8 items-center justify-center rounded-btn transition-colors hover:bg-white/6 ${
          open ? "bg-white/6 text-slate-200" : "text-muted"
        }`}
        aria-label="Notifications"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Portal: renders outside all stacking contexts */}
      {typeof window !== "undefined" && createPortal(panel, document.body)}
    </>
  );
}
