import "server-only";
import type { QuoteRequestValues } from "@/types/forms";
import { quoteEmailHtml, sendBrevoEmail, type DeliveryResult } from "@/lib/enquiry";

/**
 * Sends a quote request to the sales inbox via Brevo transactional email.
 *
 * Track 2: this module is the extraction candidate for packages/quote-engine,
 * along with a matching n8n webhook step once that integration is wired up.
 *
 * Without BREVO_API_KEY nothing is sent and the result says so, so the form
 * can show an honest fallback instead of a false confirmation.
 * BREVO_API_URL exists only so tests can point at a local mock.
 */
export async function submitQuoteRequest(values: QuoteRequestValues): Promise<DeliveryResult> {
  return sendBrevoEmail({
    apiKey: process.env.BREVO_API_KEY,
    apiUrl: process.env.BREVO_API_URL,
    to: process.env.QUOTE_NOTIFY_EMAIL ?? "sales@lavishhaus.co.za",
    replyTo: { email: values.email, name: values.fullName },
    subject: `New quote request — ${values.fullName}`,
    html: quoteEmailHtml(values),
  });
}
