"use client";

import { useEffect, useState } from "react";
import { Search, Bell, Cpu } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }));
    }
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-8">
      {/* Search */}
      <div className="flex w-72 items-center gap-2 rounded-input border border-border bg-card px-3 py-2 text-sm text-muted transition-colors focus-within:border-accent/40 focus-within:bg-white/5">
        <Search size={14} />
        <input
          placeholder="Search actions, contacts, invoices..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* AI badge */}
        <div className="hidden items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 sm:flex">
          <Cpu size={12} className="text-accent animate-pulseSoft" />
          <span className="text-[11px] font-medium text-accent">AI Chief of Staff</span>
        </div>

        {/* Live clock */}
        {time && (
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-slate-200">{time}</p>
            <p className="text-[10px] text-muted">{date}</p>
          </div>
        )}

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative rounded-btn p-2 text-muted transition-colors hover:bg-white/5 hover:text-slate-200"
        >
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent/60 to-accent text-xs font-bold text-white shadow-lg">
          R
        </div>
      </div>
    </header>
  );
}
