"use client";

import { createContext, useCallback, useContext, useState } from "react";

/* ── Context ──────────────────────────────────────────────────── */
const NotificationContext = createContext(null);

function minutesAgo(n)  { return new Date(Date.now() - n * 60_000).toISOString(); }
function hoursAgo(n)    { return new Date(Date.now() - n * 3_600_000).toISOString(); }
function daysAgo(n)     { return new Date(Date.now() - n * 86_400_000).toISOString(); }

const SEED_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "import",
    title: "Purchase order received",
    body: "Verma Enterprises — 15 display cabinets, 8 counter units.",
    timestamp: minutesAgo(8),
    read: false,
  },
  {
    id: "notif-2",
    type: "invoice",
    title: "Invoice #INV-2291 processed",
    body: "ABC Timber · ₹48,500 due in 4 days.",
    timestamp: hoursAgo(2),
    read: false,
  },
  {
    id: "notif-3",
    type: "complaint",
    title: "Complaint received",
    body: "Rakesh Traders — delivery delay on sofa set order.",
    timestamp: hoursAgo(5),
    read: false,
  },
  {
    id: "notif-4",
    type: "ai",
    title: "Payment reminder generated",
    body: "AI drafted a payment reminder for Invoice #INV-2291.",
    timestamp: daysAgo(1),
    read: true,
  },
  {
    id: "notif-5",
    type: "memory",
    title: "Business Memory updated",
    body: "New learning saved: Verma Enterprises GST requirements.",
    timestamp: daysAgo(2),
    read: true,
  },
];

let _notifId = 100;

/**
 * NotificationProvider — wrap app shell with this.
 */
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS);

  const addNotification = useCallback(({ type = "info", title, body }) => {
    const id = `notif-${++_notifId}`;
    setNotifications((prev) => [
      { id, type, title, body, timestamp: new Date().toISOString(), read: false },
      ...prev,
    ]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, addNotification, markAllRead, markRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

/**
 * useNotifications — access notification state from any client component.
 */
export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used inside <NotificationProvider>");
  return ctx;
}

/**
 * formatRelativeTime — human-friendly relative timestamp.
 */
export function formatRelativeTime(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours   = Math.floor(diff / 3_600_000);
  const days    = Math.floor(diff / 86_400_000);
  if (minutes < 1)  return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24)   return `${hours}h ago`;
  if (days === 1)   return "Yesterday";
  return `${days}d ago`;
}
