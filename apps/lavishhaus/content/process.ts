import type { ProcessStep } from "@/types/catalog";

// Timelines, response times and delivery areas are deliberately absent until
// the client confirms them (docs/lavishhaus-facts.md F-10, F-11, F-15).
export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discover",
    description: "Browse the collections online, or contact us to arrange a showroom visit.",
  },
  {
    step: 2,
    title: "Request a Quote",
    description: "Tell us the pieces, sizes and finishes you have in mind — online, by phone or on WhatsApp.",
  },
  {
    step: 3,
    title: "Refine",
    description: "For custom work, we agree the details with you before anything is made.",
  },
  {
    step: 4,
    title: "Make",
    description: "Your piece is made by MicWood Furnitures, with timelines confirmed in your quote.",
  },
  {
    step: 5,
    title: "Deliver",
    description: "Delivery and placement are arranged with you and confirmed in your quote.",
  },
];
