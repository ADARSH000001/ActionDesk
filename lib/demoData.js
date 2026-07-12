/**
 * demoData.js — Consistent fictional business world for ActionDesk.
 * All pages reference these constants for coherent demo storytelling.
 */

export const BUSINESS_WORLD = {
  customers: [
    { name: "Verma Enterprises",      since: "2021", type: "customer" },
    { name: "Sharma Furniture",       since: "2022", type: "customer" },
    { name: "Gupta Interiors",        since: "2023", type: "customer" },
    { name: "Royal Office Solutions", since: "2020", type: "customer" },
  ],
  suppliers: [
    { name: "ABC Timber",        since: "2019", type: "supplier" },
    { name: "SteelCraft India",  since: "2020", type: "supplier" },
    { name: "National Hardware", since: "2021", type: "supplier" },
  ],
  products: [
    "Office Chairs",
    "Conference Tables",
    "Executive Desks",
    "Storage Cabinets",
    "Display Cabinets",
    "Counter Units",
    "Teak Wood Panels",
    "Dining Chairs",
  ],
};

/**
 * Risk level config — used by Action Center cards.
 */
export const RISK_CONFIG = {
  High:   { color: "text-danger",  bg: "bg-danger/10",  border: "border-danger/20"  },
  Medium: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  Low:    { color: "text-success", bg: "bg-success/10", border: "border-success/20" },
};

/**
 * Category → color mapping shared across components.
 */
export const CATEGORY_STYLE = {
  Invoice:           "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Payment:           "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Quotation:         "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Complaint:         "bg-red-500/10 text-red-400 border-red-500/20",
  Meeting:           "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Purchase Order":  "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Customer Request":"bg-sky-500/10 text-sky-400 border-sky-500/20",
};

/**
 * Source → color/icon mapping shared across components.
 */
export const SOURCE_STYLE = {
  Gmail:           { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20"    },
  WhatsApp:        { bg: "bg-green-500/10",  text: "text-green-400",  border: "border-green-500/20"  },
  "Invoice Upload":{ bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
  "Voice Note":    { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  Manual:          { bg: "bg-slate-500/10",  text: "text-slate-400",  border: "border-slate-500/20"  },
};

/**
 * AI action menu descriptions — shown as hover tooltips.
 */
export const ACTION_DESCRIPTIONS = {
  "Mark as Paid":                  "Mark this invoice as paid and update the account balance.",
  "Send Receipt":                  "Generate and send an official payment receipt via email.",
  "Create Payment Reminder":       "Draft a professional payment reminder with due date and amount.",
  "Draft Payment Confirmation Email": "Compose a formal email confirming receipt of payment.",
  "Compare with Previous Quotes":  "Pull historical quotes for this customer and compare pricing.",
  "Draft Negotiation Reply":       "Write a polite counter-proposal based on your margin thresholds.",
  "Accept / Reject":               "Log your acceptance or rejection and notify the customer.",
  "Draft Formal Quotation":        "Generate a formatted quotation with GST breakup and line items.",
  "Confirm Stock Availability":    "Check inventory levels and confirm if the order can be fulfilled.",
  "Convert to Task":               "Create a follow-up task with deadline and priority.",
  "Generate Reply":                "Draft a professional customer-facing reply addressing their request.",
  "Schedule Follow-up":            "Set a follow-up reminder for 48 hours from now.",
  "Draft Apology & Resolution":    "Compose a goodwill message with a revised delivery date.",
  "Escalate to Owner":             "Flag this complaint for owner review with full context.",
  "Schedule Follow-up Call":       "Block time on your calendar for a follow-up call.",
  "Create Calendar Event":         "Add this meeting to your calendar with agenda and attendees.",
  "Assign Task":                   "Create a task card and assign it to a team member.",
  "Add Reminder":                  "Set a push reminder 24 hours before this action is due.",
  "Create Meeting":                "Schedule a meeting with the relevant contact.",
};
