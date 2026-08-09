import "server-only";
import type { ContactRequestValues } from "@/types/forms";

export async function submitContactRequest(values: ContactRequestValues) {
  const apiKey = process.env.BREVO_API_KEY;
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL ?? "info@lavishhaus.co.za";

  if (!apiKey) {
    console.warn(
      "[contact-service] BREVO_API_KEY is not set — logging contact request instead of sending.",
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
      subject: `New contact enquiry — ${values.fullName}`,
      htmlContent: `
        <h2>New Contact Enquiry</h2>
        <p><strong>Name:</strong> ${values.fullName}</p>
        <p><strong>Email:</strong> ${values.email}</p>
        <p><strong>Phone:</strong> ${values.phone ?? "Not provided"}</p>
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
