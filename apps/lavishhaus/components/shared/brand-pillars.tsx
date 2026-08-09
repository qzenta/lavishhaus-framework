import { Hammer, MapPin, Gem, PenTool } from "lucide-react";

const pillars = [
  {
    icon: Hammer,
    title: "Crafted for Timeless Living",
    description: "Every piece built to outlast trends.",
  },
  {
    icon: MapPin,
    title: "Handmade in Johannesburg",
    description: "Manufactured by MicWood Furnitures.",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    description: "Solid timber, full-grain leather, brass hardware.",
  },
  {
    icon: PenTool,
    title: "Custom Orders Welcome",
    description: "Bespoke dimensions, finishes and designs.",
  },
];

export function BrandPillars() {
  return (
    <section className="border-y border-border/60 bg-charcoal">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="flex items-center gap-4 border-b border-ivory/10 px-6 py-6 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:px-8 lg:py-8"
          >
            <pillar.icon
              className="size-8 shrink-0 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="font-heading text-sm font-semibold tracking-wide text-ivory">
                {pillar.title}
              </p>
              <p className="mt-0.5 text-xs text-ivory/60">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
