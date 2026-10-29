# Lavish Haus — Email setup log

Record of changes to email delivery for `lavishhaus.co.za`. Destination mailboxes and credentials are not written here.

> **Rule:** a row may only say Added, Enabled or Verified after a DNS lookup against 1.1.1.1, or a screenshot of the Cloudflare or Brevo dashboard, confirms it. Until then it says "Not yet enabled, pending".

## Finding

Before 29 Oct 2026 the `lavishhaus.co.za` DNS zone held only web records:

| Type | Name | Value |
|---|---|---|
| A | `lavishhaus.co.za` | `76.76.21.21` (Vercel) |
| CNAME | `www` | `cname.vercel-dns.com` |

There was **no MX record**, so mail to `info@lavishhaus.co.za` and `sales@lavishhaus.co.za` could not be delivered. These are the addresses published on the site, and the defaults that the quote and contact forms send to (`QUOTE_NOTIFY_EMAIL` → `sales@`, `CONTACT_NOTIFY_EMAIL` → `info@`, unless overridden in Vercel). Any form notification or customer email sent to them would have bounced or been lost.

## Changes

| Date | Change | Details | Records | Status |
|---|---|---|---|---|
| 29 Oct 2026 | Cloudflare Email Routing | Custom addresses `info@lavishhaus.co.za` and `sales@lavishhaus.co.za` to forward to a Qzenta-held mailbox as an **interim** destination, until the client names the mailbox that should receive enquiries (see Open client decisions; address not recorded here) | MX, SPF and DKIM records published by Cloudflare; values below | Routes info@ and sales@ Active in Cloudflare dashboard 29 Oct 2026; delivery test Passed 29 Oct 2026, info@ forwards to the interim mailbox |
| 29 Oct 2026 | Production test: quote form | Quote request submitted on the live site after merge commit `960f04e`, notifying `sales@lavishhaus.co.za`. An earlier attempt from a stale page loaded before the deployment sent nothing | — | Result: Delivered (to be confirmed) |

### Open client decisions

| # | Decision | Interim arrangement | Status |
|---|---|---|---|
| D-1 | Which mailbox should receive enquiries sent to `info@` and `sales@` (including website form notifications) | Forwarding to a Qzenta-held mailbox (address not recorded here) | Open, awaiting client |

### Records published by Cloudflare Email Routing

An earlier lookup against 1.1.1.1 on 29 Oct 2026 returned no MX or SPF record. A later lookup the same day confirmed the records below.

| Type | Name | Value | Priority | Status | Result |
|---|---|---|---|---|---|
| MX | `lavishhaus.co.za` | `route1.mx.cloudflare.net` | 28 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| MX | `lavishhaus.co.za` | `route2.mx.cloudflare.net` | 67 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| MX | `lavishhaus.co.za` | `route3.mx.cloudflare.net` | 93 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| TXT (SPF) | `lavishhaus.co.za` | `v=spf1 include:_spf.mx.cloudflare.net ~all` | — | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| TXT (DKIM) | `cf2024-1._domainkey` | `v=DKIM1` key published by Cloudflare (key not recorded here) | — | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |

### Brevo sender authentication

Records that let Brevo send the form notifications as `lavishhaus.co.za` (DKIM, DMARC and domain verification).

| System | Type | Name | Value | Proxy | Added | Status | Result |
|---|---|---|---|---|---|---|---|
| Cloudflare DNS | TXT | `@` | `brevo-code:097147a167a35a74e208063b16a4b4bb` | — | 29 Oct 2026 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| Cloudflare DNS | CNAME | `brevo1._domainkey` | `b1.lavishhaus-co-za.dkim.brevo.com` | DNS only | 29 Oct 2026 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| Cloudflare DNS | CNAME | `brevo2._domainkey` | `b2.lavishhaus-co-za.dkim.brevo.com` | DNS only | 29 Oct 2026 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| Cloudflare DNS | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | — | 29 Oct 2026 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| Brevo | Domain | `lavishhaus.co.za` | Domain added in Brevo | — | 29 Oct 2026 | Authenticated | Brevo log 29 Oct 2026 19:47: contact enquiry from no-reply@lavishhaus.co.za to info@lavishhaus.co.za Sent and Delivered; earlier 18:23 attempt was Error (sender not valid) before authentication |
