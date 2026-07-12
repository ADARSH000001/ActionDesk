"use client";

/**
 * LoadingSkeleton — shimmer placeholder blocks.
 *
 * Props:
 *   className  additional classes for sizing/shape
 */
export function Skeleton({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}

/**
 * CardSkeleton — full card-shaped skeleton (used in grid lists).
 */
export function CardSkeleton() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <Skeleton className="h-16 w-full rounded-btn" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24 rounded-btn" />
        <Skeleton className="h-8 w-24 rounded-btn" />
      </div>
    </div>
  );
}

/**
 * RowSkeleton — single-line row placeholder.
 */
export function RowSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-card border border-border bg-surface p-4">
          <Skeleton className="h-9 w-9 rounded-btn shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
}
