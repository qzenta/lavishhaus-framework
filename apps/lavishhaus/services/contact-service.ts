import "server-only";
import type { ContactRequestValues } from "@/types/forms";
import { contactEmailHtml, sendBrevoEmail, type DeliveryResult } from "@/lib/enquiry";

/** See quote-service.ts for the configuration and not-configured behaviour. */
export async function submitContactRequest(values: ContactRequestValues): Promise<DeliveryResult> {
  return sendBrevoEmail({
    apiKey: process.env.BREVO_API_KEY,
    apiUrl: process.env.BREVO_API_URL,
    to: process.env.CONTACT_NOTIFY_EMAIL ?? "info@lavishhaus.co.za",
    replyTo: { email: values.email, name: values.fullName },
    subject: `New contact enquiry — ${values.fullName}`,
    html: contactEmailHtml(values),
  });
}
