// Pure enquiry helpers (no server-only / path-alias imports) so they can be
// unit-tested with `node --test`. The services wrap these with env config.
import type { ContactRequestValues, QuoteRequestValues } from "@/types/forms";

export const HONEYPOT_FIELD = "website";
/** Real people take longer than this to fill in a form; most bots don't. */
export const MIN_FILL_MS = 2500;

export type DeliveryResult =
  | { delivered: true }
  | { delivered: false; reason: "not-configured" | "spam" };

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const row = (label: string, value: unknown) =>
  `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
const multiline = (label: string, value: unknown) =>
  `<p><strong>${escapeHtml(label)}:</strong><br/>${escapeHtml(value).replace(/\r?\n/g, "<br/>")}</p>`;

export function quoteEmailHtml(values: QuoteRequestValues): string {
  return [
    "<h2>New Quote Request</h2>",
    row("Name", values.fullName),
    row("Email", values.email),
    row("Phone", values.phone),
    row("Collection", values.collection || "Not specified"),
    row("Piece", values.piece || "Not specified"),
    row("Space type", values.spaceType),
    row("Budget range", values.budgetRange || "Not specified"),
    multiline("Message", values.message),
  ].join("\n");
}

export function contactEmailHtml(values: ContactRequestValues): string {
  return [
    "<h2>New Contact Enquiry</h2>",
    row("Name", values.fullName),
    row("Email", values.email),
    row("Phone", values.phone || "Not provided"),
    multiline("Message", values.message),
  ].join("\n");
}

/** Header values can't contain line breaks (header injection). */
export const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/**
 * Bot check on the raw submission: a filled honeypot field, or a form
 * submitted faster than a person could fill it in.
 */
export function isLikelySpam(raw: unknown, now = Date.now()): boolean {
  if (!raw || typeof raw !== "object") return true;
  const record = raw as Record<string, unknown>;
  if (typeof record[HONEYPOT_FIELD] === "string" && record[HONEYPOT_FIELD] !== "") return true;
  const startedAt = Number(record.startedAt);
  if (!Number.isFinite(startedAt)) return true;
  return now - startedAt < MIN_FILL_MS;
}

export async function sendBrevoEmail(params: {
  apiKey: string | undefined;
  apiUrl?: string;
  to: string;
  replyTo: { email: string; name: string };
  subject: string;
  html: string;
  fetchImpl?: typeof fetch;
}): Promise<DeliveryResult> {
  if (!params.apiKey) return { delivered: false, reason: "not-configured" };

  const response = await (params.fetchImpl ?? fetch)(
    params.apiUrl ?? "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": params.apiKey },
      body: JSON.stringify({
        sender: { name: "Lavish Haus Website", email: "no-reply@lavishhaus.co.za" },
        to: [{ email: params.to }],
        replyTo: { email: params.replyTo.email, name: singleLine(params.replyTo.name) },
        subject: singleLine(params.subject),
        htmlContent: params.html,
      }),
    }
  );

  if (!response.ok) {
    // Status only: the response body can echo submitted personal data.
    throw new Error(`Brevo request failed with status ${response.status}`);
  }
  return { delivered: true };
}
