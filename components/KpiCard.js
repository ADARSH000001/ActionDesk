export default function KpiCard({ icon: Icon, label, value, subtitle, tone = "accent" }) {
  const toneClasses = {
    accent: "bg-accent/15 text-accent",
    danger: "bg-danger/15 text-danger",
    warning: "bg-warning/15 text-warning",
    success: "bg-success/15 text-success",
  };

  const ringClasses = {
    accent: "hover:border-accent/40",
    danger: "hover:border-danger/40",
    warning: "hover:border-warning/40",
    success: "hover:border-success/40",
  };

  return (
    <div className={`card-hover rounded-card border border-border bg-surface p-5 ${ringClasses[tone]}`}>
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-btn ${toneClasses[tone]}`}>
          <Icon size={17} />
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
      {subtitle && <p className="mt-2 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
}
