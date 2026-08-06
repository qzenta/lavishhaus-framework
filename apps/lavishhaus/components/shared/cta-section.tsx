import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection({
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-8">
        <h2 className="font-heading text-3xl text-ivory sm:text-4xl">{title}</h2>
        <p className="max-w-xl text-ivory/70">{description}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-none bg-gold px-7 py-5 text-warm-black hover:bg-gold-muted"
          >
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          {secondaryCta ? (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none border-ivory/30 bg-transparent px-7 py-5 text-ivory hover:bg-ivory/10 hover:text-ivory"
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
