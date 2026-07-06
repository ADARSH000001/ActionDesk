import { normalizeCard } from "./schema";

// Simple in-memory store. Good enough for a hackathon demo / single dev
// server process. Swap for a real DB later.
const globalStore = globalThis;

if (!globalStore.__actiondesk_cards) {
  globalStore.__actiondesk_cards = seedCards();
}

function seedCards() {
  // ONE coherent story: Verma Enterprises showroom fit-out project
  // All cards are connected — purchase order → complaint → quotation → invoice → meeting → payment
  const seeds = [
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
