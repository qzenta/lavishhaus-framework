import type { FaqItem } from "@/types/catalog";

// Answers avoid unconfirmed timelines, response times, delivery areas and
// care promises (docs/lavishhaus-facts.md). Update when the client confirms.
export const faqs: FaqItem[] = [
  {
    category: "General",
    question: "Who manufactures Lavish Haus furniture?",
    answer:
      "Lavish Haus pieces are made by MicWood Furnitures, our manufacturing partner. Lavish Haus is the showroom and customer-facing brand.",
  },
  {
    category: "General",
    question: "Where is the Lavish Haus showroom?",
    answer:
      "The showroom is at 635 Ontdekkers Road, Delarey, Randburg. Please contact us by phone or WhatsApp to arrange a visit.",
  },
  {
    category: "Quotes & Pricing",
    question: "Why don't you list prices online?",
    answer:
      "Many pieces can be made in different sizes, coverings and finishes, so the price depends on your specification. Request a quote with the details you have and we'll be in touch.",
  },
  {
    category: "Quotes & Pricing",
    question: "Can I buy online?",
    answer:
      "Not at the moment. Lavish Haus works on a quotation basis: every collection page has a Request a Quote button, or you can send us a message on WhatsApp.",
  },
  {
    category: "Custom Furniture",
    question: "Can you make a piece that isn't in your collections?",
    answer:
      "Yes. Start a custom enquiry describing what you have in mind. Photos, sketches and measurements all help.",
  },
  {
    category: "Custom Furniture",
    question: "How long does a custom piece take?",
    answer:
      "It depends on the piece and its finish. We'll confirm the timeline in your quote.",
  },
  {
    category: "Delivery & Care",
    question: "Do you deliver?",
    answer:
      "Delivery is arranged with you, and the details and any costs are confirmed in your quote.",
  },
  {
    category: "Delivery & Care",
    question: "How should I care for my furniture?",
    answer:
      "Care depends on the covering and finish. Ask us about your specific piece and we'll advise.",
  },
];
