// Simulated "Sync Gmail" / "Sync WhatsApp" payloads — part of the same
// Verma Enterprises showroom fit-out story as the seed cards.
// In a real integration these would come from the Gmail API / WhatsApp Business API.

export const MOCK_GMAIL_MESSAGES = [
  {
    subject: "RE: Showroom Fit-Out – Cabinet Dimensions Confirmation",
    from: "purchasing@vermaenterprises.com",
    body: "Hi, following up on our purchase order for 15 display cabinets and 8 counter units. We need the formal quotation with GST breakup urgently — our interior contractor is waiting. Can you confirm the custom dimensions (H:200cm, W:90cm) are feasible? Delivery expected within 5 days of order confirmation.",
  },
  {
    subject: "Urgent: Sofa set still not delivered",
    from: "rakesh@rakeshtraders.com",
    body: "This is the third follow up. Our sofa set order (Order #RT-4421) was supposed to arrive 4 days ago. Our customer is furious and threatening to cancel. Please provide the tracking details and new delivery date immediately or we will have to escalate.",
  },
  {
    subject: "Invoice #INV-2291 – FINAL REMINDER",
    from: "accounts@abctraders.in",
    body: "Dear Sir, this is a final reminder for Invoice INV-2291 worth Rs. 48,500 for teak wood panels delivered on 1st. Payment was due 7 days ago. A late fee of 2% per week applies from tomorrow. Kindly process today to avoid additional charges.",
  },
];

export const MOCK_WHATSAPP_MESSAGES = [
  {
    from: "+91 98765 43210 (Sharma Furniture)",
    body: "Bhaiya abhi tak quotation nahi aya, 20 dining chairs walnut finish ke liye. Hotel ka meeting kal hai humara, aaj raat tak price confirm kar dijiye please. Aur GST alag dikhana quotation mein.",
  },
  {
    from: "+91 91234 56789 (Anil – Site Supervisor)",
    body: "Sir Verma Enterprises ke showroom pe Saturday 9am jaana hai. Contractor bhi aa raha hai. Aap aa sakte ho? Cabinet placement decide karna hai warna delivery hold ho jayegi.",
  },
  {
    from: "+91 99887 76655 (Verma Enterprises – Accounts)",
    body: "Bhai pichle order ka poora payment kar diya hai. NEFT se. Receipt aur invoice closure bhej dijiye accounts ke liye. Aur naya showroom order ke liye quotation ka wait kar rahe hain.",
  },
];
