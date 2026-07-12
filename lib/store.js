import { normalizeCard } from "./schema";

// Simple in-memory store. Good enough for a hackathon demo / single dev
// server process. Swap for a real DB later.
const globalStore = globalThis;

if (!globalStore.__actiondesk_cards) {
  globalStore.__actiondesk_cards = seedCards();
}

function seedCards() {
  const seeds = [
    // ── Active (Pending) Actions ─────────────────────────────────────────
    {
      title: "Purchase Order – Verma Enterprises Showroom Fit-Out",
      source: "Gmail",
      category: "Purchase Order",
      priority: "High",
      summary: "Verma Enterprises has placed a purchase order for 15 display cabinets and 8 counter units for their new showroom. They require a formal quotation with GST breakup before processing payment.",
      why_it_matters: "This is your largest pending order this month. Verma has asked for GST breakup specifically — delays here could push the order to a competitor.",
      deadline: daysFromNow(2),
      recommended_action: "Send formal quotation with GST breakup today.",
      status: "Pending",
      // ── Extended model ──────────────────────────────
      company: "Verma Enterprises",
      customerSince: "2021",
      risk: "High",
      businessContext: "Largest purchase order this month. Verma Enterprises is a repeat customer with 3 orders placed this year. They consistently request a formal GST breakup before authorizing payment.",
      businessValue: { label: "Estimated Deal Value", amount: "₹1,20,000" },
      learning: "Verma Enterprises requires GST breakup documentation before authorizing payment on any order.",
      recommendation: "Automatically include GST breakup template for all future Verma Enterprises quotations.",
      tags: ["purchase-order", "gst", "showroom", "high-value"],
      confidence: 94,
      relatedActions: [],
      details: {
        contact: "Suresh Verma · +91 98200 11234",
        lastConversation: "5 days ago",
        previousOrders: 3,
        paymentTerms: "Net 14 days",
        preferredComm: "Email",
        expectedDelivery: "18 Jul 2026",
        owner: "Raj Patel",
        notes: "Always include GST breakup in quotation. Verma signs off same-day when docs are complete.",
      },
    },
    {
      title: "Delivery Delay Complaint – Rakesh Traders",
      source: "Gmail",
      category: "Complaint",
      priority: "High",
      summary: "Rakesh Traders says their sofa set order is 4 days overdue and their customer is waiting. They need a revised delivery date immediately.",
      why_it_matters: "Rakesh Traders is a repeat customer with 3 orders this year. An unresolved complaint risks losing the relationship and a potential referral.",
      deadline: daysFromNow(1),
      recommended_action: "Call Rakesh Traders with revised delivery date and offer a goodwill gesture.",
      status: "Pending",
      company: "Rakesh Traders",
      customerSince: "2022",
      risk: "High",
      businessContext: "Rakesh Traders is a repeat customer worth ₹2,40,000/year. Unresolved delivery complaints escalate quickly and risk the relationship and downstream referrals in the local market.",
      businessValue: { label: "At-Risk Revenue", amount: "₹2,40,000/yr" },
      learning: "Delivery delays with Rakesh Traders escalate rapidly if not acknowledged within 24 hours.",
      recommendation: "Set up proactive delivery delay alerts for all Rakesh Traders orders.",
      tags: ["complaint", "delivery", "urgent", "relationship-risk"],
      confidence: 88,
      relatedActions: [],
      details: {
        contact: "Rakesh Agarwal · +91 91234 56789",
        lastConversation: "Yesterday",
        previousOrders: 6,
        paymentTerms: "Net 7 days",
        preferredComm: "WhatsApp",
        expectedDelivery: "Overdue — escalate now",
        owner: "Priya Singh",
        notes: "Responds 8× faster on WhatsApp. Do not wait for email replies beyond 4 hours on urgent issues.",
      },
    },
    {
      title: "Quotation Request – Sharma Furniture (20 Dining Chairs)",
      source: "WhatsApp",
      category: "Quotation",
      priority: "Medium",
      summary: "Sharma Furniture is asking for a quote on 20 dining chairs, walnut finish, for a hotel order. They need it urgently and the deal is time-sensitive.",
      why_it_matters: "Hotel orders have high margins and often lead to repeat bulk orders. Sharma is known to move fast — a slow quote means losing this to another supplier.",
      deadline: daysFromNow(3),
      recommended_action: "Send updated price list with lead time within 24 hours.",
      status: "Pending",
      company: "Sharma Furniture",
      customerSince: "2022",
      risk: "Medium",
      businessContext: "Hotel orders carry high margins and open doors to repeat bulk purchases. Sharma Furniture moves fast — competitors respond within hours. This hotel project is estimated at ₹85,000 in chair sales alone.",
      businessValue: { label: "Potential Revenue", amount: "₹85,000" },
      learning: "Sharma Furniture hotel quotations are highly time-sensitive. Responding within 24 hours has a 3× higher win rate.",
      recommendation: "Prioritize hospitality-sector quotations from Sharma Furniture above standard requests.",
      tags: ["quotation", "hotel", "bulk-order", "dining-chairs", "walnut"],
      confidence: 78,
      relatedActions: [],
      details: {
        contact: "Deepak Sharma · +91 99000 22345",
        lastConversation: "2 days ago",
        previousOrders: 4,
        paymentTerms: "Advance payment",
        preferredComm: "WhatsApp",
        expectedDelivery: "22 Jul 2026",
        owner: "Raj Patel",
        notes: "Always attach current price sheet. Sharma comparison-shops and converts when pricing is visible upfront.",
      },
    },
    {
      title: "Invoice #INV-2291 – ABC Traders (Teak Wood Panels)",
      source: "Gmail",
      category: "Invoice",
      priority: "High",
      summary: "ABC Traders sent invoice INV-2291 for teak wood panels delivered last week. Total amount due: ₹48,500. Payment must be made within 7 days to avoid a late fee.",
      why_it_matters: "ABC Traders supplies your primary teak wood stock. A late payment could affect your credit terms and delay the Verma Enterprises order materials.",
      deadline: daysFromNow(4),
      recommended_action: "Process payment before the due date to maintain supplier relationship.",
      status: "Pending",
      company: "ABC Timber",
      customerSince: "2019",
      risk: "High",
      businessContext: "ABC Timber is your primary teak wood supplier since 2019. A delayed payment triggers a 2% late fee and risks downgrade of your preferential credit terms, which would impact the Verma Enterprises order timeline.",
      businessValue: { label: "Invoice Amount", amount: "₹48,500" },
      learning: "ABC Timber applies a 2% late fee after 7 days and may tighten credit terms for accounts with repeated delays.",
      recommendation: "Set up automated payment reminders 3 days before all ABC Timber invoice due dates.",
      tags: ["invoice", "supplier", "teak-wood", "payment-due", "credit-terms"],
      confidence: 96,
      relatedActions: [],
      details: {
        contact: "Accounts Dept · +91 80000 33456",
        lastConversation: "3 days ago",
        previousOrders: 12,
        paymentTerms: "Net 7 days (2% late fee)",
        preferredComm: "Email",
        expectedDelivery: "N/A — supplier",
        owner: "Meera Joshi",
        notes: "Primary teak supplier since 2019. Preferential credit terms at risk. Pay by Day 5 at latest.",
      },
    },
    {
      title: "Site Visit – New Showroom (Saturday Morning)",
      source: "WhatsApp",
      category: "Meeting",
      priority: "Medium",
      summary: "Site Supervisor Anil wants to confirm the Saturday morning visit to the new showroom site with the contractor. Timing needs to be confirmed.",
      why_it_matters: "This site visit determines the cabinet placement layout for the Verma Enterprises order — directly impacts delivery timelines.",
      deadline: daysFromNow(5),
      recommended_action: "Reply to Anil confirming Saturday timing and share arrival time with contractor.",
      status: "Pending",
      company: "Verma Enterprises",
      customerSince: "2021",
      risk: "Medium",
      businessContext: "This site visit gates the cabinet placement layout for the Verma Enterprises showroom order. Without confirmation, installation scheduling and delivery timelines cannot be locked.",
      businessValue: { label: "Project Value", amount: "₹1,20,000" },
      learning: "Verma Enterprises site visits require 48-hour advance confirmation for contractor coordination.",
      recommendation: "Create a site visit confirmation checklist for all Verma Enterprises project milestones.",
      tags: ["meeting", "site-visit", "showroom", "contractor", "coordination"],
      confidence: 82,
      relatedActions: [],
      details: {
        contact: "Anil Kumar (Site Supervisor) · +91 98765 43210",
        lastConversation: "Today",
        previousOrders: null,
        paymentTerms: "N/A",
        preferredComm: "WhatsApp",
        expectedDelivery: "19 Jul 2026 (Saturday)",
        owner: "Raj Patel",
        notes: "Confirm 48h in advance. Contractor needs arrival time to arrange access. Tied to Verma PO delivery.",
      },
    },
    {
      title: "Payment Received – Verma Enterprises (Previous Order)",
      source: "Gmail",
      category: "Payment",
      priority: "Low",
      summary: "Verma Enterprises confirmed full payment of the pending balance for their previous order. Receipt and invoice closure required.",
      why_it_matters: "Closing this payment cleans up your receivables and keeps the Verma account in good standing ahead of the new showroom order.",
      deadline: null,
      recommended_action: "Mark invoice as paid and send official receipt.",
      status: "Pending",
      company: "Verma Enterprises",
      customerSince: "2021",
      risk: "Low",
      businessContext: "Verma Enterprises has cleared their previous balance, demonstrating reliable payment behaviour. Closing this promptly strengthens the relationship ahead of the new ₹1,20,000 showroom order.",
      businessValue: { label: "Payment Received", amount: "₹68,000" },
      learning: "Verma Enterprises consistently pays within 14 days when a formal receipt and invoice closure is provided promptly.",
      recommendation: "Send official receipt within 24 hours of payment confirmation to reinforce the prompt-payment cycle.",
      tags: ["payment", "received", "receipt", "account-closure", "verma"],
      confidence: 99,
      relatedActions: [],
      details: {
        contact: "Suresh Verma · +91 98200 11234",
        lastConversation: "1 week ago",
        previousOrders: 3,
        paymentTerms: "Net 14 days",
        preferredComm: "Email",
        expectedDelivery: "N/A",
        owner: "Raj Patel",
        notes: "Send official receipt promptly. Verma Enterprises has paid on time on all 3 previous orders.",
      },
    },

    // ── Completed (Done) — Business Memory Seeds ──────────────────────────
    {
      title: "Quotation Accepted – Verma Enterprises (Office Chairs Batch)",
      source: "Gmail",
      category: "Purchase Order",
      priority: "High",
      summary: "Verma Enterprises confirmed acceptance of the quotation for 25 executive office chairs. GST breakup was provided upfront and payment was processed within 3 days.",
      why_it_matters: "Verma Enterprises is a repeat high-value customer. Providing GST breakup on the first interaction eliminated back-and-forth and accelerated payment.",
      deadline: daysFromNow(-15),
      recommended_action: "GST breakup was included proactively — this is the recommended approach for all future Verma orders.",
      status: "Done",
      company: "Verma Enterprises",
      customerSince: "2021",
      risk: "Low",
      businessContext: "Verma Enterprises placed and paid this order within 3 business days after receiving a quotation that included a full GST breakup. This is a repeatable pattern — they consistently require GST documentation before releasing payment.",
      businessValue: { label: "Order Value", amount: "₹72,500" },
      learning: "Verma Enterprises always requests GST breakup before authorizing payment. Providing it upfront eliminates follow-up emails and speeds up the payment cycle by an average of 4 days.",
      recommendation: "Automatically attach GST breakup to every future quotation sent to Verma Enterprises.",
      tags: ["purchase-order", "gst", "verma", "completed", "high-value"],
      confidence: 97,
      relatedActions: [],
    },
    {
      title: "Complaint Resolved – Rakesh Traders (Damaged Goods)",
      source: "Gmail",
      category: "Complaint",
      priority: "High",
      summary: "Rakesh Traders reported a damaged dining table in their last shipment. The complaint was raised via email but was only resolved after switching to WhatsApp for faster coordination.",
      why_it_matters: "Rakesh Traders escalated from email to WhatsApp before a resolution was reached. Response rate via WhatsApp was 8× faster than email on this case.",
      deadline: daysFromNow(-30),
      recommended_action: "Replacement dispatched and goodwill discount applied. Relationship retained.",
      status: "Done",
      company: "Rakesh Traders",
      customerSince: "2022",
      risk: "Low",
      businessContext: "After 3 unanswered emails over 48 hours, the complaint was moved to WhatsApp and resolved within 2 hours. Rakesh Traders is more responsive on WhatsApp than email — a clear behavioural pattern across 3 prior complaints.",
      businessValue: { label: "Retained Revenue", amount: "₹2,40,000/yr" },
      learning: "Rakesh Traders responds much faster on WhatsApp than email. For urgent complaints, WhatsApp should be the first channel — not the fallback.",
      recommendation: "Use WhatsApp first for all urgent complaint resolution with Rakesh Traders. Do not wait for email responses beyond 4 hours.",
      tags: ["complaint", "whatsapp", "damaged-goods", "resolved", "relationship"],
      confidence: 93,
      relatedActions: [],
    },
    {
      title: "Invoice Paid – ABC Timber (Sheesham Wood Supply)",
      source: "Gmail",
      category: "Invoice",
      priority: "Medium",
      summary: "Invoice INV-2187 for sheesham wood panels was paid by ABC Timber on Day 2 — well within the 7-day window. No reminder was needed.",
      why_it_matters: "ABC Timber has now paid on or before Day 2 on 4 consecutive invoices. Payment reminders before Day 3 are redundant and can be removed from the workflow.",
      deadline: daysFromNow(-45),
      recommended_action: "Invoice closed. No action required — ABC Timber paid proactively as expected.",
      status: "Done",
      company: "ABC Timber",
      customerSince: "2019",
      risk: "Low",
      businessContext: "ABC Timber has demonstrated a consistent on-time payment pattern across the last 4 invoices, with an average settlement time of 1.8 days. Sending payment reminders before Day 3 has had no impact on payment speed.",
      businessValue: { label: "Invoice Amount", amount: "₹36,200" },
      learning: "ABC Timber consistently pays within two business days. Payment reminders sent before Day 3 are unnecessary and add noise to the supplier relationship.",
      recommendation: "Disable payment reminders for ABC Timber before the 3-day mark. Only send a reminder if payment has not been received by end of Day 3.",
      tags: ["invoice", "supplier", "payment-received", "abc-timber", "pattern"],
      confidence: 99,
      relatedActions: [],
    },
    {
      title: "Quotation Converted – Sharma Furniture (Hotel Project)",
      source: "WhatsApp",
      category: "Quotation",
      priority: "Medium",
      summary: "Sharma Furniture confirmed the order for 20 dining chairs after receiving an updated price sheet. The updated pricing was the deciding factor — they had received a lower quote from a competitor.",
      why_it_matters: "Sharma Furniture had approached a competitor but chose to stay after receiving the updated price sheet. This pattern has repeated on 3 quotations this year.",
      deadline: daysFromNow(-20),
      recommended_action: "Order confirmed and production scheduled. Price sheet attachment was the key conversion lever.",
      status: "Done",
      company: "Sharma Furniture",
      customerSince: "2022",
      risk: "Low",
      businessContext: "Sharma Furniture frequently requests updated pricing before confirming bulk orders. On 3 out of 4 hotel project quotations this year, the deal was closed only after attaching the current price sheet — even when the original quote was competitive.",
      businessValue: { label: "Order Value", amount: "₹85,000" },
      learning: "Sharma Furniture frequently requests updated pricing before confirming orders. They comparison-shop actively and are converted by seeing a current price sheet attached to the quotation.",
      recommendation: "Automatically attach the current price sheet to all Sharma Furniture quotations at the time of sending — do not wait for them to request it.",
      tags: ["quotation", "sharma", "price-sheet", "hotel", "converted"],
      confidence: 91,
      relatedActions: [],
    },
  ];

  return seeds.map((s) => normalizeCard(s, s.source));
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function getCards() {
  return globalStore.__actiondesk_cards;
}

export function addCard(raw, fallbackSource) {
  const card = normalizeCard(raw, fallbackSource);
  globalStore.__actiondesk_cards.unshift(card);
  return card;
}

export function addCards(rawList, fallbackSource) {
  return rawList.map((r) => addCard(r, fallbackSource));
}

export function updateCard(id, patch) {
  const cards = globalStore.__actiondesk_cards;
  const idx = cards.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  cards[idx] = { ...cards[idx], ...patch };
  return cards[idx];
}

export function resetCards() {
  globalStore.__actiondesk_cards = seedCards();
  return globalStore.__actiondesk_cards;
}
