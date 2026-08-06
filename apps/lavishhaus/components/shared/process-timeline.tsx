import type { ProcessStep } from "@/types/catalog";

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step) => (
        <li key={step.step} className="flex flex-col gap-3">
          <span className="font-heading text-3xl text-gold">
            {String(step.step).padStart(2, "0")}
          </span>
          <h3 className="font-heading text-lg text-charcoal">{step.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
