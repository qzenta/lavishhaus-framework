import { Factory, MessageCircle, PenTool, Sofa } from "lucide-react";

// Each pillar states only what's on file (docs/lavishhaus-facts.md).
const pillars = [
  {
    icon: Factory,
    title: "Made by MicWood Furnitures",
    description: "Lavish Haus pieces are made by our manufacturing partner.",
  },
  {
    icon: Sofa,
    title: "Beds, Walls & Dining",
    description: "Statement headboards, TV walls and dining sets.",
  },
  {
    icon: PenTool,
    title: "Custom Orders Welcome",
    description: "Sizes, finishes and one-off designs.",
  },
  {
    icon: MessageCircle,
    title: "Quote on WhatsApp",
    description: "Send a photo or an idea and we'll respond.",
  },
];

export function BrandPillars() {
  return (
    <section className="border-y border-border/60 bg-charcoal" aria-label="Why Lavish Haus">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-0 lg:grid-cols-4">
        {pillars.map((pillar) => (
          <li
            key={pillar.title}
            className="flex items-center gap-3 border-ivory/10 px-4 py-5 odd:border-r [&:nth-child(-n+2)]:border-b sm:gap-4 sm:px-6 sm:py-6 lg:border-r lg:px-8 lg:py-8 lg:[&:nth-child(-n+2)]:border-b-0 lg:last:border-r-0"
          >
            <pillar.icon
              className="size-6 shrink-0 text-gold sm:size-7"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="font-heading text-[0.95rem] tracking-wide text-ivory">
                {pillar.title}
              </p>
              <p className="mt-0.5 hidden text-xs text-ivory/70 sm:block">{pillar.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
