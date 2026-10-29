# Lavish Haus — Email setup log

Record of changes to email delivery for `lavishhaus.co.za`. Destination mailboxes and credentials are not written here.

> **Rule:** a row may only say Added or Enabled after a DNS lookup against 1.1.1.1 or a visible Cloudflare screen confirms it. Until then it says "Not yet enabled, pending".

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
| 29 Oct 2026 | Cloudflare Email Routing | Custom addresses `info@lavishhaus.co.za` and `sales@lavishhaus.co.za` to forward to the client mailbox (address not recorded here) | MX and SPF (TXT) records expected from Cloudflare; values below | Not yet enabled, pending |

### Records expected from Cloudflare Email Routing

_Values to be pasted from the Cloudflare dashboard._ A lookup against 1.1.1.1 on 29 Oct 2026 returned no MX record and no SPF record for `lavishhaus.co.za`.

| Type | Name | Value | Priority | Status |
|---|---|---|---|---|
| MX | `lavishhaus.co.za` | _pending_ | _pending_ | Not yet enabled, pending |
| MX | `lavishhaus.co.za` | _pending_ | _pending_ | Not yet enabled, pending |
| MX | `lavishhaus.co.za` | _pending_ | _pending_ | Not yet enabled, pending |
| TXT (SPF) | `lavishhaus.co.za` | _pending_ | — | Not yet enabled, pending |

### Brevo sender authentication

Records that let Brevo send the form notifications as `lavishhaus.co.za` (DKIM, DMARC and domain verification).

| System | Type | Name | Value | Proxy | Added | Status | Result |
|---|---|---|---|---|---|---|---|
| Cloudflare DNS | TXT | `@` | `brevo-code:097147a167a35a74e208063b16a4b4bb` | — | 29 Oct 2026 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| Cloudflare DNS | CNAME | `brevo1._domainkey` | `b1.lavishhaus-co-za.dkim.brevo.com` | DNS only | 29 Oct 2026 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| Cloudflare DNS | CNAME | `brevo2._domainkey` | `b2.lavishhaus-co-za.dkim.brevo.com` | DNS only | 29 Oct 2026 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| Cloudflare DNS | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | — | 29 Oct 2026 | Verified live | Confirmed via Resolve-DnsName against 1.1.1.1 on 29 Oct 2026 |
| Brevo | Domain | `lavishhaus.co.za` | Domain added in Brevo | — | 29 Oct 2026 | Pending authentication | |
