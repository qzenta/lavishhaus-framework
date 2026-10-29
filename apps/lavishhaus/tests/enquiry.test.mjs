// Run with `npm test` (node --test; Node strips the TypeScript types).
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  contactEmailHtml,
  escapeHtml,
  isLikelySpam,
  quoteEmailHtml,
  sendBrevoEmail,
  singleLine,
} from "../lib/enquiry.ts";

const quote = {
  fullName: `<script>alert("x")</script> Jane`,
  email: "jane@example.com",
  phone: "082 000 0000",
  collection: "upholstered-beds",
  piece: `Bed & "Co"`,
  spaceType: "Residential",
  budgetRange: "",
  message: "Line one\n<img src=x onerror=alert(1)>",
  consent: true,
};

test("escapeHtml escapes markup characters", () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  assert.equal(escapeHtml(undefined), "");
});

test("quote email contains no raw submitted markup", () => {
  const html = quoteEmailHtml(quote);
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes("<img"));
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("Bed &amp; &quot;Co&quot;"));
  assert.ok(html.includes("Line one<br/>&lt;img"));
  assert.ok(html.includes("Budget range:</strong> Not specified"));
});

test("contact email escapes values", () => {
  const html = contactEmailHtml({ fullName: "<b>x</b>", email: "a@b.co", message: "hello there" });
  assert.ok(html.includes("&lt;b&gt;x&lt;/b&gt;"));
  assert.ok(html.includes("Phone:</strong> Not provided"));
});

test("singleLine strips header line breaks", () => {
  assert.equal(singleLine("Jane\r\nBcc: evil@x.com"), "Jane Bcc: evil@x.com");
});

test("isLikelySpam: honeypot, timing, missing timestamp", () => {
  const now = 1_000_000;
  assert.equal(isLikelySpam({ [HONEYPOT_FIELD]: "", startedAt: now - MIN_FILL_MS - 1 }, now), false);
  assert.equal(isLikelySpam({ [HONEYPOT_FIELD]: "http://spam", startedAt: now - 60_000 }, now), true);
  assert.equal(isLikelySpam({ startedAt: now - 100 }, now), true);
  assert.equal(isLikelySpam({}, now), true);
  assert.equal(isLikelySpam(null, now), true);
});

test("sendBrevoEmail without a key sends nothing and reports not-configured", async () => {
  let called = false;
  const result = await sendBrevoEmail({
    apiKey: undefined,
    to: "sales@example.com",
    replyTo: { email: "a@b.co", name: "A" },
    subject: "s",
    html: "h",
    fetchImpl: async () => { called = true; return new Response(null); },
  });
  assert.deepEqual(result, { delivered: false, reason: "not-configured" });
  assert.equal(called, false);
});

test("sendBrevoEmail posts a sanitised payload and reports delivery", async () => {
  let request;
  const result = await sendBrevoEmail({
    apiKey: "test-key",
    apiUrl: "http://mock.invalid/email",
    to: "sales@example.com",
    replyTo: { email: "a@b.co", name: "Jane\nBcc: x" },
    subject: "New quote\r\nBcc: x",
    html: "<p>ok</p>",
    fetchImpl: async (url, init) => { request = { url, init }; return new Response("{}", { status: 201 }); },
  });
  assert.deepEqual(result, { delivered: true });
  assert.equal(request.url, "http://mock.invalid/email");
  const body = JSON.parse(request.init.body);
  assert.equal(body.subject, "New quote Bcc: x");
  assert.equal(body.replyTo.name, "Jane Bcc: x");
  assert.equal(body.to[0].email, "sales@example.com");
});

test("sendBrevoEmail throws a status-only error on failure", async () => {
  await assert.rejects(
    sendBrevoEmail({
      apiKey: "k",
      to: "t@x.co",
      replyTo: { email: "a@b.co", name: "A" },
      subject: "s",
      html: "h",
      fetchImpl: async () => new Response("echo jane@example.com", { status: 400 }),
    }),
    (err) => err.message === "Brevo request failed with status 400"
  );
});
