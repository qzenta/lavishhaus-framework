# Lavish Haus — Fact validation register

Rule (override 5): every business claim stays out of prominent copy, or is
softened, until this register shows a **client-supplied source**. Agency-written
material (`docs/master-prompt-lavish-haus.md`, `docs/cc-handoff.md`, earlier
commit messages) isn't a client source; it's recorded as "agency brief".

| # | Claim (where it appeared) | Evidence on file | Source type | Decision on site |
|---|---|---|---|---|
| F-01 | Lavish Haus is the showroom/retail brand; furniture is manufactured by MicWood Furnitures | `master-prompt-lavish-haus.md` §Company Background | agency brief | **kept**: core identity, stated plainly; client to confirm |
| F-02 | "Johannesburg Showroom Opening Soon" (home), "first showroom is opening" (about, FAQ) | Agency brief says "will open in Johannesburg" (Aug 2026) | agency brief, possibly outdated | **removed** "opening soon"; neutral wording |
| F-03 | Showroom at 635 Ontdekkers Road, Delarey, Randburg 2114 | Commit `ae120d9` (9 Aug) says "real address"; no client document | agency assertion | **kept** as the contact address, with "contact us to arrange a visit"; client to confirm |
| F-04 | Opening hours Mon–Fri 09–17, Sat 09–14, Sun closed | None | none | **removed**; replaced with "contact us to confirm visiting times" |
| F-05 | Phone / WhatsApp +27 78 355 6579; info@ and sales@lavishhaus.co.za | Commit `ae120d9` says "real" | agency assertion | **kept** (needed for enquiries); client to confirm |
| F-06 | FSC-certified timber | None | none | **removed** |
| F-07 | Full-grain / vegetable-tanned leather | None | none | **removed** |
| F-08 | 15-year structural guarantee | None | none | **removed** |
| F-09 | Customer testimonials (Naledi M., David R., Thandiwe K.) | None; written for the build | fabricated | **removed** |
| F-10 | Quote response "within one business day" | None | none | **softened** to "we'll be in touch to discuss your quote" |
| F-11 | Lead time "8–12 weeks, made to order" (every product); "10–16 weeks" (FAQ) | None | none | **removed**; "timelines confirmed with your quote" |
| F-12 | Completed projects in Houghton, Sandton, Camps Bay | None; picsum images | fabricated | **removed**; `/projects/*` redirected |
| F-13 | Product names (Aurelia, Marchetti, Linden, Porter, Hollis, Reyes, Carrow, Solano, Palazzo), dimensions, finishes | None; written for the build | fabricated | **replaced** by descriptive names of the photographed pieces; no dimensions |
| F-14 | "Eighteen months of prototyping", "first dining chair run in 2019", "most requested by returning MicWood clients" | None | fabricated | **removed** |
| F-15 | Delivery across South Africa | None | none | **softened** to "delivery is arranged and confirmed with your quote" |
| F-16 | Bespoke / custom furniture offered | Agency brief lists "Custom Furniture" as a core page; client photos show built-in and installed pieces | agency brief + photos | **kept** |
| F-17 | Outdoor furniture offered | Agency brief lists Outdoor; no outdoor photos | agency brief | **kept as a category** with a "photos coming / enquire" note; client to confirm |
| F-18 | Social accounts @lavishhaus (Instagram, Facebook, Pinterest) | None | none | **hidden** until confirmed |
| F-19 | Online ordering not available; quotation-based | Agency handoff: "No payment, no checkout, no cart — matches the client's confirmed current requirement" | agency brief citing client | **kept** |
| F-20 | Kitchen work (islands, cabinetry) | One client photo | client photo | **kept** |
| F-21 | "Hand-built", "traditional joinery — mortise and tenon, dovetail" | None | none | **softened** to "made by MicWood Furnitures" |
| F-22 | Pieces shown in installed (residential) settings are Lavish Haus/MicWood work | Supplied by the client via WhatsApp, 29 Oct | client photos (implicit) | **used as product photos**; not labelled as named client projects |

## Questions for the client

1. Is the showroom at 635 Ontdekkers Road open now? If so, what are the visiting hours?
2. Can you confirm the phone/WhatsApp number and the info@ and sales@ addresses?
3. Which of these can be stated, with a document: FSC certification, leather grade, a structural guarantee (term), typical lead times, quote response time, delivery area?
4. Do you have real testimonials you have permission to publish, and real projects (name, area, permission, photos)?
5. What are your real social media accounts?
6. Do you make outdoor furniture?
7. Product names: should the photographed pieces have names?
8. The "KHUNE" Chesterfield armchair: may it be published (customer consent)?

## Batch 4 additions

| ID | Item | Status | Site decision |
|---|---|---|---|
| F-23 | Privacy policy names Brevo (form email) and Microsoft Clarity (analytics, cookies, default input masking) | Derived from the code (`services/*`, `app/layout.tsx`), not legal advice | Disclosed on `/privacy`. The client should confirm the Clarity masking settings in its dashboard and decide whether a POPIA consent banner is needed before Clarity loads. |
