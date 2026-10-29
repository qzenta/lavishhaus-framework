"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EnquiryFallback } from "@/components/shared/enquiry-fallback";
import { HoneypotField } from "@/components/shared/honeypot-field";
import { siteConfig } from "@/config/site";
import { HONEYPOT_FIELD } from "@/lib/enquiry";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collections } from "@/content/collections";
import { submitQuoteRequestAction } from "@/lib/actions";
import { quoteRequestSchema, type QuoteRequestValues } from "@/types/forms";

const spaceTypes = ["Residential", "Commercial", "Hospitality", "Other"];
const budgetRanges = [
  "Under R50,000",
  "R50,000 – R150,000",
  "R150,000 – R350,000",
  "R350,000+",
  "Not sure yet",
];

export function QuoteForm({
  defaultCollection,
  piece,
}: {
  defaultCollection?: string;
  piece?: string;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  // Time the form was first shown, for the minimum-fill-time spam check.
  const [startedAt] = useState(() => Date.now());

  const form = useForm<QuoteRequestValues>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      collection: defaultCollection ?? "",
      piece: piece ?? "",
      spaceType: "",
      budgetRange: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: QuoteRequestValues) {
    setStatus("idle");
    setErrorMessage(null);
    setShowFallback(false);
    const result = await submitQuoteRequestAction({
      ...values,
      [HONEYPOT_FIELD]: honeypot,
      startedAt,
    });

    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
      setShowFallback(result.fallback === true);
    }
  }

  if (status === "success") {
    return (
      <div
        ref={(el) => el?.focus()}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center gap-4 border border-border bg-card p-10 text-center outline-none"
      >
        <CheckCircle2 className="size-10 text-walnut" aria-hidden="true" />
        <h2 className="font-heading text-2xl text-charcoal">Request received</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you. Your request has been sent to the Lavish Haus team, who will
          be in touch about your quote.
        </p>
        <Button variant="outline" className="rounded-none" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      {piece ? (
        <p className="mb-6 border-l-2 border-walnut pl-4 text-sm text-charcoal">
          Enquiring about: <strong className="font-medium">{piece}</strong>
        </p>
      ) : null}
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6" noValidate>
        <HoneypotField value={honeypot} onChange={setHoneypot} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Dlamini" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jane@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="082 000 0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection (optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a collection" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {collections.map((collection) => (
                      <SelectItem key={collection.slug} value={collection.slug}>
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="spaceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Space type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a space type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {spaceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget range (optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about your space</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Dimensions, timeline, finish preferences — anything that helps us quote accurately."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={field.value === true}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-0.5 size-4 accent-gold"
                />
                I&apos;m happy for Lavish Haus to contact me about this request.
              </label>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && errorMessage ? (
          showFallback ? (
            <EnquiryFallback message={errorMessage} email={siteConfig.contact.salesEmail} />
          ) : (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          )
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-none bg-charcoal py-6 text-ivory hover:bg-warm-black sm:w-auto"
        >
          {form.formState.isSubmitting ? "Sending..." : "Request a Quote"}
        </Button>
      </form>
    </Form>
  );
}
