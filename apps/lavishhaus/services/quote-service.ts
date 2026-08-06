import "server-only";
import type { QuoteRequestValues } from "@/types/forms";

/**
 * Sends a quote request to Brevo (transactional email + CRM contact).
 *
 * Track 2: this module is the extraction candidate for packages/quote-engine,
 * along with a matching n8n webhook step once that integration is wired up.
 *
 * Requires BREVO_API_KEY in the environment. Until that's configured, requests
 * are logged instead of sent so the form can be exercised end-to-end locally.
 */
export async function submitQuoteRequest(values: QuoteRequestValues) {
  const apiKey = process.env.BREVO_API_KEY;
  const notifyEmail = process.env.QUOTE_NOTIFY_EMAIL ?? "hello@lavishhaus.co.za";

  if (!apiKey) {
    console.warn(
      "[quote-service] BREVO_API_KEY is not set — logging quote request instead of sending.",
      values
    );
    return { delivered: false as const };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: "Lavish Haus Website", email: "no-reply@lavishhaus.co.za" },
      to: [{ email: notifyEmail }],
      replyTo: { email: values.email, name: values.fullName },
      subject: `New quote request — ${values.fullName}`,
      htmlContent: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${values.fullName}</p>
        <p><strong>Email:</strong> ${values.email}</p>
        <p><strong>Phone:</strong> ${values.phone}</p>
        <p><strong>Collection:</strong> ${values.collection ?? "Not specified"}</p>
        <p><strong>Space type:</strong> ${values.spaceType}</p>
        <p><strong>Budget range:</strong> ${values.budgetRange ?? "Not specified"}</p>
        <p><strong>Message:</strong><br/>${values.message}</p>
      `,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo request failed (${response.status}): ${body}`);
  }

  return { delivered: true as const };
}
