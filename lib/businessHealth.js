/**
 * generateBusinessHealth — pure function, no API needed.
 * Takes the current cards array and returns a health assessment.
 *
 * Returns:
 *   { status: "Good"|"Warning"|"Critical", color: "green"|"amber"|"red", icon: string, reasons: string[] }
 */
export function generateBusinessHealth(cards) {
  const pending = cards.filter((c) => c.status !== "Done");
  const urgent = pending.filter((c) => c.priority === "High");
  const today = new Date().toDateString();

  // Check for overdue items
  const overdue = pending.filter((c) => {
    if (!c.deadline) return false;
    const d = new Date(c.deadline);
    return !Number.isNaN(d.getTime()) && d < new Date(today);
  });

  // Check for unresolved complaints
  const complaints = pending.filter((c) => c.category === "Complaint");

  // Check pending payments
  const payments = pending.filter((c) =>
    ["Invoice", "Payment"].includes(c.category)
  );

  // ── CRITICAL ──────────────────────────────────────────────
  if (overdue.length > 0 || urgent.length > 4) {
    const reasons = [];
    if (overdue.length > 0)
      reasons.push(`${overdue.length} overdue item${overdue.length > 1 ? "s" : ""} requiring immediate attention.`);
    if (urgent.length > 4)
      reasons.push(`${urgent.length} high-priority actions are pending.`);
    if (complaints.length > 0)
      reasons.push(`${complaints.length} customer complaint${complaints.length > 1 ? "s" : ""} unresolved.`);
    return { status: "Critical", color: "red", icon: "🔴", reasons };
  }

  // ── WARNING ───────────────────────────────────────────────
  if (urgent.length > 2 || complaints.length > 0 || payments.length > 2) {
    const reasons = [];
    if (urgent.length > 2)
      reasons.push(`${urgent.length} urgent actions require attention today.`);
    if (complaints.length > 0)
      reasons.push(`${complaints.length} customer complaint${complaints.length > 1 ? "s" : ""} need a response.`);
    if (payments.length > 2)
      reasons.push(`${payments.length} pending payments awaiting collection.`);
    return { status: "Warning", color: "amber", icon: "🟡", reasons };
  }

  // ── GOOD ──────────────────────────────────────────────────
  const reasons = [];
  if (overdue.length === 0) reasons.push("No overdue payments or deliveries.");
  if (urgent.length <= 2)
    reasons.push(
      urgent.length === 0
        ? "No urgent actions require attention."
        : `Only ${urgent.length} high-priority action${urgent.length > 1 ? "s" : ""} require attention.`
    );
  if (complaints.length === 0) reasons.push("Customer response time remains healthy.");

  return { status: "Good", color: "green", icon: "🟢", reasons };
}
