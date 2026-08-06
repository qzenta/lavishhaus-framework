import { Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/types/catalog";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-4xl">
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.author}>
            <figure className="flex flex-col items-center gap-6 px-4 text-center">
              <Quote className="size-8 text-gold" aria-hidden="true" />
              <blockquote className="font-heading text-xl leading-relaxed text-charcoal sm:text-2xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-muted-foreground">
                <span className="font-medium text-charcoal">{testimonial.author}</span>
                {" — "}
                {testimonial.role}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-8 flex items-center justify-center gap-4">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
}
