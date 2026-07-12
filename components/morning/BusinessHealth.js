"use client";

/**
 * BusinessHealth — displays health status + reason bullets.
 *
 * Props:
 *   health  { status, color, icon, reasons[] }  — from generateBusinessHealth()
 */
export default function BusinessHealth({ health }) {
  if (!health) return null;

  const colorMap = {
    green: {
      pill:   "bg-success/10 border-success/20 text-success",
      bullet: "bg-success",
      text:   "text-success",
    },
    amber: {
      pill:   "bg-warning/10 border-warning/20 text-warning",
      bullet: "bg-warning",
      text:   "text-warning",
    },
    red: {
      pill:   "bg-danger/10 border-danger/20 text-danger",
      bullet: "bg-danger",
      text:   "text-danger",
    },
  };

  const c = colorMap[health.color] ?? colorMap.green;

  return (
    <div className="space-y-3">
      {/* Status pill */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
          Business Health
        </span>
      </div>
      <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${c.pill}`}>
        <span className="text-sm">{health.icon}</span>
        <span className="text-sm font-semibold">{health.status}</span>
      </div>

      {/* Reasons */}
      {health.reasons.length > 0 && (
        <ul className="space-y-1.5">
          {health.reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${c.bullet}`} />
              <span className="text-xs leading-relaxed text-muted">{reason}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
