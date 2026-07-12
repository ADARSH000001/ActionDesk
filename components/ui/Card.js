"use client";

/**
 * Card — base card component.
 *
 * Props:
 *   hover     boolean — enable lift-on-hover effect
 *   padding   "sm" | "md" | "lg" | "none"
 *   as        string — rendered element (default "div")
 *   children  ReactNode
 */
export function Card({ hover = false, padding = "md", as: Tag = "div", className = "", children, ...rest }) {
  const paddings = {
    none: "",
    sm:   "p-4",
    md:   "p-6",
    lg:   "p-8",
  };

  return (
    <Tag
      className={`rounded-card border border-border bg-surface ${paddings[padding]} ${hover ? "card-hover" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Section — a labelled page section with optional action.
 *
 * Props:
 *   title     string
 *   subtitle  string
 *   action    ReactNode — optional right-side element
 *   children  ReactNode
 */
export function Section({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`space-y-4 ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-white">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
