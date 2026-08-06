"use server";

import { contactRequestSchema, quoteRequestSchema } from "@/types/forms";
import { submitContactRequest } from "@/services/contact-service";
import { submitQuoteRequest } from "@/services/quote-service";

export async function submitQuoteRequestAction(rawValues: unknown) {
  const parsed = quoteRequestSchema.safeParse(rawValues);

  if (!parsed.success) {
    return { success: false as const, error: "Please check the form and try again." };
  }

  try {
    await submitQuoteRequest(parsed.data);
    return { success: true as const };
  } catch (error) {
    console.error("[submitQuoteRequestAction]", error);
    return {
      success: false as const,
      error: "Something went wrong sending your request. Please try again or WhatsApp us.",
    };
  }
}

export async function submitContactRequestAction(rawValues: unknown) {
  const parsed = contactRequestSchema.safeParse(rawValues);

  if (!parsed.success) {
    return { success: false as const, error: "Please check the form and try again." };
  }

  try {
    await submitContactRequest(parsed.data);
    return { success: true as const };
  } catch (error) {
    console.error("[submitContactRequestAction]", error);
    return {
      success: false as const,
      error: "Something went wrong sending your message. Please try again or WhatsApp us.",
    };
  }
}
