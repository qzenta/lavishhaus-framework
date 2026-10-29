"use server";

import { contactRequestSchema, quoteRequestSchema } from "@/types/forms";
import { submitContactRequest } from "@/services/contact-service";
import { submitQuoteRequest } from "@/services/quote-service";
import { isLikelySpam, type DeliveryResult } from "@/lib/enquiry";

export type ActionResult =
  | { success: true }
  | { success: false; error: string; fallback?: boolean };

const INVALID = "Please check the form and try again.";

async function deliver(
  label: string,
  send: () => Promise<DeliveryResult>,
  failure: string
): Promise<ActionResult> {
  try {
    const result = await send();
    if (result.delivered) return { success: true };
    // Not configured: say so rather than show a false confirmation.
    console.warn(`[${label}] email delivery is not configured; enquiry not sent`);
    return { success: false, fallback: true, error: failure };
  } catch (error) {
    // Log the error message only, never the submitted values.
    console.error(`[${label}]`, error instanceof Error ? error.message : "unknown error");
    return { success: false, fallback: true, error: failure };
  }
}

export async function submitQuoteRequestAction(rawValues: unknown): Promise<ActionResult> {
  // Bots get a quiet success so they don't retry; nothing is sent.
  if (isLikelySpam(rawValues)) return { success: true };

  const parsed = quoteRequestSchema.safeParse(rawValues);
  if (!parsed.success) return { success: false, error: INVALID };

  return deliver(
    "submitQuoteRequestAction",
    () => submitQuoteRequest(parsed.data),
    "We couldn't send your request just now. Please WhatsApp, call or email us instead."
  );
}

export async function submitContactRequestAction(rawValues: unknown): Promise<ActionResult> {
  if (isLikelySpam(rawValues)) return { success: true };

  const parsed = contactRequestSchema.safeParse(rawValues);
  if (!parsed.success) return { success: false, error: INVALID };

  return deliver(
    "submitContactRequestAction",
    () => submitContactRequest(parsed.data),
    "We couldn't send your message just now. Please WhatsApp, call or email us instead."
  );
}
