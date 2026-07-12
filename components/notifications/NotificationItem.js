"use client";

import {
  ShoppingCart, FileText, AlertTriangle,
  Sparkles, BrainCircuit, Info,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/notifications";

const TYPE_CONFIG = {
  import:    { icon: ShoppingCart, color: "text-accent",      bg: "bg-accent/10"      },
  invoice:   { icon: FileText,     color: "text-yellow-400",  bg: "bg-yellow-500/10"  },
  complaint: { icon: AlertTriangle,color: "text-danger",      bg: "bg-danger/10"      },
  ai:        { icon: Sparkles,     color: "text-purple-400",  bg: "bg-purple-500/10"  },
  memory:    { icon: BrainCircuit, color: "text-success",     bg: "bg-success/10"     },
  info:      { icon: Info,         color: "text-muted",       bg: "bg-white/5"        },
};

/**
 * NotificationItem — single notification row.
 *
 * Props:
 *   notification  { id, type, title, body, timestamp, read }
 *   onRead        (id) => void
 */
export default function NotificationItem({ notification, onRead }) {
  const cfg  = TYPE_CONFIG[notification.type] ?? TYPE_CONFIG.info;
  const Icon = cfg.icon;

  return (
    <button
      onClick={() => onRead(notification.id)}
      className={`group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04] ${
        !notification.read ? "bg-accent/[0.03]" : ""
      }`}
    >
      {/* Icon */}
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-btn ${cfg.bg}`}>
        <Icon size={14} className={cfg.color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-medium leading-snug ${notification.read ? "text-muted" : "text-slate-200"}`}>
          {notification.title}
        </p>
        {notification.body && (
          <p className="mt-0.5 truncate text-[11px] text-muted">{notification.body}</p>
        )}
        <p className="mt-1 text-[10px] text-subtle tabular-nums">
          {formatRelativeTime(notification.timestamp)}
        </p>
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
      )}
    </button>
  );
}
