import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  level = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Background the heading sits on. Walnut eyebrows on light (gold on ivory fails WCAG AA), gold on dark. */
  tone?: "light" | "dark";
  /** Use "h1" when the heading is the page title (pages without a Hero). */
  level?: "h1" | "h2";
  className?: string;
}) {
  const Heading = level;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-medium tracking-[0.2em] uppercase",
            tone === "light" ? "text-walnut" : "text-gold-muted"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={cn(
          "font-heading text-3xl sm:text-4xl",
          tone === "light" ? "text-charcoal" : "text-ivory"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base",
            tone === "light" ? "text-muted-foreground" : "text-ivory/75",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
