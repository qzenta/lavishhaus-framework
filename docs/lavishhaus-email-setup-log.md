# Lavish Haus — Email setup log

Record of changes to email delivery for `lavishhaus.co.za`. Destination mailboxes and credentials are not written here.

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
| 29 Oct 2026 | Cloudflare Email Routing enabled | Custom addresses `info@lavishhaus.co.za` and `sales@lavishhaus.co.za` forward to the client mailbox (address not recorded here) | MX and SPF (TXT) records added automatically by Cloudflare; values below | Enabled; values pending |

### Records added by Cloudflare

_Values to be pasted from the Cloudflare dashboard._

| Type | Name | Value | Priority |
|---|---|---|---|
| MX | `lavishhaus.co.za` | _pending_ | _pending_ |
| MX | `lavishhaus.co.za` | _pending_ | _pending_ |
| MX | `lavishhaus.co.za` | _pending_ | _pending_ |
| TXT (SPF) | `lavishhaus.co.za` | _pending_ | — |
