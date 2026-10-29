\# LAVISH HAUS — AUTONOMOUS WEBSITE AUDIT, REDESIGN AND FINALISATION



\*\*Project:\*\* Lavish Haus  

\*\*Website:\*\* https://www.lavishhaus.co.za  

\*\*Audit date:\*\* 29 October 2026  

\*\*Mandate:\*\* Complete the audit, redesign, technical remediation, testing and release preparation of the Lavish Haus website to a premium, production-ready standard.



\## 1. Operating mandate



Act as the autonomous website engineering, UX, visual design, accessibility, performance and quality-assurance team.



The client has supplied photographs. Discover and use the actual supplied assets wherever appropriate. Deliver a visually compelling, credible, fast, accessible and commercially effective luxury furniture website.



Do not stop after producing an audit or a design proposal. Implement the improvements, run the relevant tests, inspect the results, correct defects and repeat until the acceptance criteria are met or a genuine external blocker is reached.



Operate in successive, bounded work batches. Maintain persistent progress in repository documentation so that work can resume after context resets, session interruptions or model limits without losing decisions or repeating completed work.



Do not require routine human approval for ordinary implementation choices, styling, image optimisation, responsive adjustments, component refactoring, non-destructive local tests or documented bug fixes.



\## 2. Source-of-truth and initial inspection



Begin by inspecting the existing project. Do not assume a framework, directory structure, hosting provider, image location, form integration or deployment architecture.



Establish and document:



\- Repository, current branch, working-tree state and latest commit.

\- Framework, package manager, runtime and build commands.

\- Existing routes, components, layouts, styles and design assets.

\- Deployment configuration and available preview/staging environment.

\- Form submission destination, notification mechanism and integrations.

\- Existing SEO, analytics, security and performance configuration.

\- Existing tests and their baseline results.

\- All supplied client photographs, videos, logos, fonts and brand materials.



Preserve unrelated user work. Never discard, reset, overwrite or commit unrelated changes. Use a dedicated branch if the repository workflow permits it.



Run the existing application and capture baseline screenshots before redesigning. Verify which public pages actually exist and which are linked from navigation, footer, products and calls to action.



Create `docs/lavishhaus-audit.md` containing the audit findings, severity, evidence, proposed remedy, verification method and current status.



\## 3. Required visual direction



Position Lavish Haus as a premium, contemporary furniture and bespoke interiors brand.



Target a restrained editorial aesthetic:



\- Large, authentic furniture and interior photography.

\- Refined typography and strong visual hierarchy.

\- Warm, natural material tones balanced with sophisticated dark and light surfaces.

\- Deliberate whitespace, aligned layouts and consistent proportions.

\- Clear, elegant buttons and product cards.

\- Subtle, purposeful transitions.

\- High-quality mobile layouts rather than a compressed desktop design.



The first screen must communicate the brand, the furniture offering and the next action immediately.



Use the supplied client's real photographs as the primary visual source. Never misrepresent AI-generated images, generic stock imagery or unrelated products as Lavish Haus inventory or completed client projects.



Do not fabricate customer reviews, product specifications, project histories, materials certifications, guarantees, prices, delivery commitments or business credentials.



\## 4. Image and media production



Create an asset manifest, preferably at `docs/lavishhaus-assets.md`, recording original filename, proposed destination, product or collection association, output derivatives and verification status.



Inspect every image for relevance and visual quality. The current live Aurelia Sofa Collection gallery includes imagery described as TV wall consoles. Verify and correct this mismatch rather than blindly retaining existing associations.



Implement an appropriate image pipeline:



\- Preserve original supplied files.

\- Generate correctly sized responsive derivatives.

\- Use modern formats where supported.

\- Preserve aspect ratios and use deliberate object positioning.

\- Optimise the primary hero asset and avoid unnecessary above-the-fold loading.

\- Lazy-load suitable below-the-fold media.

\- Add descriptive, accurate alt text.

\- Provide fallbacks for optional video and motion content.



Use CSS and native browser transitions for lightweight interactions. Evaluate HyperFrames or Remotion for a genuine cinematic hero, brand film, product presentation or campaign asset only when technically justified.



If those tools are not installed or would add disproportionate complexity, use the best maintainable alternative. Do not introduce an additional framework merely to satisfy a technology preference.



All animations must respect reduced-motion preferences, avoid blocking navigation, preserve text readability and remain usable on mobile devices.



\## 5. Full-site audit and implementation scope



Inspect and remediate the entire customer-facing website, not just the homepage.



Include:



1\. Homepage, hero, first-screen composition and primary calls to action.

2\. Global navigation, mobile menu, footer and breadcrumbs.

3\. Collection landing pages and collection/product detail pages.

4\. Product galleries, image associations, dimensions, materials and finish information.

5\. Related products and collection discovery.

6\. Custom furniture and bespoke enquiry journeys.

7\. Quote form, contact page and all enquiry mechanisms.

8\. Showroom page, address, hours, maps and contact details.

9\. Brand story, craftsmanship, projects and FAQs.

10\. Privacy policy, terms and any other existing legal or trust pages.

11\. Page titles, descriptions, canonical URLs, structured data, sitemap and indexability.

12\. Responsive layouts, accessibility, performance, security and analytics.

13\. Broken links, missing images, console errors and failed network requests.



Preserve existing valid URLs where possible. Where URL changes are necessary, add appropriate redirects and verify them.



\## 6. Business facts requiring validation



The live website currently contains a potential inconsistency between “Johannesburg Showroom Opening Soon” on the homepage and a showroom page presenting an address and opening hours.



It also makes claims concerning FSC-certified timber, full-grain leather, a 15-year structural guarantee, customer testimonials, a one-business-day quotation response and 8–12-week production lead times.



Create a fact-validation register. Confirm these details against existing authoritative client-provided material and source content.



Do not invent or silently infer missing business facts. If a fact cannot be verified from available evidence, preserve it for client confirmation, remove it from prominent promotional claims where necessary, or use cautious wording that does not mislead customers.



Do not invent replacement testimonials, customer identities, project photographs, certifications or guarantees.



\## 7. UX and conversion requirements



Make the intended customer journey straightforward:



Homepage → Collection → Relevant furniture → Product information → Quote or enquiry.



Also support:



\- Bespoke/custom furniture enquiries.

\- Direct telephone contact.

\- WhatsApp enquiries where configured.

\- Showroom directions and visits.

\- Related collections and useful FAQs.



Keep the main action obvious without overwhelming the visitor with competing buttons.



Test the actual quotation submission path. Verify field validation, consent handling, submission errors, success feedback, notifications and spam protection. Use test data only in non-production environments.



Do not claim that a form or integration works solely because its UI renders correctly.



\## 8. Engineering and safety constraints



Work in the existing architecture unless there is clear evidence that a structural change is necessary.



Prefer maintainable, reusable components and minimal additional dependencies.



Do not expose secrets, API keys, credentials, personal information or environment-variable contents in logs, reports, screenshots or commits.



Do not modify DNS, hosting accounts, payment configuration, production secrets, customer data, email routing or other consequential infrastructure without the relevant explicit authorisation.



Do not send real customer messages or create production enquiries during testing.



Use the repository's existing development and staging processes. Build, test and prepare the release candidate autonomously. Production deployment, destructive changes and externally consequential actions must follow the established authorisation process; do not treat the general autonomous mandate as blanket permission for those actions.



\## 9. Testing requirements



Run all relevant existing checks and add focused tests where practical.



At minimum, verify:



\- Production build succeeds.

\- Lint and type checks pass where configured.

\- All important routes load.

\- Navigation and internal links work.

\- Product images match their intended content.

\- Images do not create broken layouts.

\- Forms validate, submit in the test environment and show accurate feedback.

\- Telephone, email, WhatsApp and map links use correct destinations.

\- Desktop, tablet and mobile layouts work.

\- Keyboard navigation and visible focus work.

\- Reduced-motion preferences are respected.

\- No critical accessibility errors remain.

\- No unresolved critical browser console or network errors remain.

\- SEO metadata and indexability are correct.

\- Performance is measured and material bottlenecks are addressed.

\- Existing functionality has not regressed.



Use browser automation, screenshots, accessibility tooling and performance tooling already available in the environment. If a tool is missing, use a reasonable available alternative rather than stopping the entire project.



Record actual results. Never manufacture test output, Lighthouse scores, Core Web Vitals, successful submissions or screenshots.



\## 10. Autonomous execution loop



After the initial audit, continue this loop:



1\. Read the current progress register and the latest repository state.

2\. Select the highest-priority actionable defects.

3\. Implement a bounded batch of changes.

4\. Run the smallest relevant tests.

5\. Run the broader regression checks affected by those changes.

6\. Inspect screenshots and browser behaviour at relevant viewport sizes.

7\. Compare the result against the acceptance criteria.

8\. Fix defects discovered during verification.

9\. Update the audit, progress register, asset manifest and evidence.

10\. Commit completed batches on the authorised working branch, following repository conventions.

11\. Select the next highest-priority unfinished task.

12\. Repeat until the completion criteria are satisfied or a documented external blocker is reached.



Do not repeatedly re-audit already verified work without a reason. Do not mark a task complete merely because code was written or a build passed.



Prioritise, in order:



P0 — Broken or misleading customer journeys, incorrect product imagery, serious trust issues, broken forms, security problems and critical accessibility defects.



P1 — Core visual redesign, responsive layouts, product discovery, contact conversion, major performance problems and essential SEO.



P2 — Refinement of typography, spacing, imagery, motion, content hierarchy, secondary pages and lower-severity defects.



P3 — Optional enhancements that have measurable value and do not compromise stability or delivery.



\## 11. Persistent project records



Maintain the following records in the repository, adapting paths if an existing documentation convention is better:



\- `docs/lavishhaus-audit.md` — full audit and evidence.

\- `docs/lavishhaus-progress.md` — current status, completed work, next tasks and blockers.

\- `docs/lavishhaus-assets.md` — asset inventory and image mapping.

\- `docs/lavishhaus-test-report.md` — test commands, results, screenshots and known limitations.

\- `docs/lavishhaus-release.md` — release readiness, deployment steps and rollback procedure.



At every checkpoint, record the current branch and commit, last successful tests, outstanding defects, next actions and any required external input.



After any session or context reset, inspect the actual repository state and resume from these records. Do not assume a prior task succeeded merely because the progress register says it was attempted.



\## 12. Definition of done



Do not declare finalisation until:



\- All important customer-facing routes have been inspected.

\- The visual system is coherent and the homepage creates an immediate premium impression.

\- Client-supplied images have been appropriately curated, mapped and optimised.

\- No known material product-to-image mismatches remain.

\- Business claims are verified, qualified or removed as appropriate.

\- Core desktop and mobile journeys work.

\- Quote and contact mechanisms have verified test evidence.

\- Critical and high-severity defects are resolved.

\- Build and applicable regression tests pass.

\- Accessibility, SEO and performance checks have been completed with evidence.

\- The site has been checked at realistic viewport sizes.

\- Documentation, remaining limitations and release instructions are complete.



Distinguish verified completion from blocked or untested work. A third-party service outage, unavailable credentials or missing client fact must be documented precisely rather than bypassed with fabricated success.



\## 13. Final report



When acceptance criteria are met, provide a concise but complete report covering:



\- What changed and why.

\- Routes and components improved.

\- Image assets processed and how they were mapped.

\- Any HyperFrames/Remotion or alternative motion work delivered.

\- Tests executed and their actual outcomes.

\- Performance and accessibility measurements, where available.

\- Commit references and release candidate status.

\- Outstanding client decisions, if any.

\- Exact deployment and rollback instructions.



Begin with the baseline audit, then proceed directly to implementation. Work autonomously within the defined boundaries; do not wait for routine design approvals. Continue until finalisation is evidence-backed, not merely until the first redesign is complete.

