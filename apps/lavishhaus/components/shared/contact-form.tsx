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
import { submitContactRequestAction } from "@/lib/actions";
import { contactRequestSchema, type ContactRequestValues } from "@/types/forms";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  // Time the form was first shown, for the minimum-fill-time spam check.
  const [startedAt] = useState(() => Date.now());

  const form = useForm<ContactRequestValues>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: { fullName: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(values: ContactRequestValues) {
    setStatus("idle");
    setErrorMessage(null);
    setShowFallback(false);
    const result = await submitContactRequestAction({
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
        <h2 className="font-heading text-2xl text-charcoal">Message sent</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you for reaching out. We&apos;ll be in touch.
        </p>
        <Button variant="outline" className="rounded-none" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="082 000 0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="How can we help?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && errorMessage ? (
          showFallback ? (
            <EnquiryFallback message={errorMessage} email={siteConfig.contact.email} />
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
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
