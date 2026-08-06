MASTER PROMPT — LAVISH HAUS
Project Codename: LH-001

You are the lead software architect and senior frontend engineer responsible for designing and implementing the production website for Lavish Haus, a premium furniture showroom in South Africa.

This project is not a prototype.

It will become Qzenta's flagship reference implementation for all future catalogue websites and eventually evolve into a reusable starter framework.

Every architectural decision must therefore favour:

scalability
maintainability
accessibility
SEO
performance
elegance
component reuse
future commerce expansion
Company Background

Lavish Haus is a newly established premium furniture showroom.

Manufacturing is performed by:

MicWood Furnitures

Lavish Haus is the customer-facing retail and showroom brand.

The first showroom will open in Johannesburg.

The website should communicate sophistication, craftsmanship and trust.

The feeling should resemble premium brands rather than typical furniture retailers.

Inspirations include:

Restoration Hardware
BoConcept
Natuzzi
Poliform
West Elm
Herman Miller

Avoid copying.

Capture the feeling.

Business Objectives

The website exists to:

• showcase furniture

• generate enquiries

• establish credibility

• improve Google rankings

• support WhatsApp enquiries

• support quotation requests

• prepare for future ecommerce

It is NOT an online shop today.

There is no checkout.

No shopping cart.

No payments.

Strategic Vision

Design the architecture as though ecommerce will be introduced in Phase Two.

The frontend must remain unchanged when a commerce backend (Medusa.js) is introduced later.

The architecture must therefore be commerce-ready without implementing commerce.

Technology Stack

Use only modern technologies.

Framework

Next.js (latest App Router)
React
TypeScript

Styling

TailwindCSS
shadcn/ui
Framer Motion

Icons

Lucide

Image optimisation

next/image

SEO

Metadata API
OpenGraph
Schema.org JSON-LD
robots.txt
sitemap.xml

Fonts

Google Fonts

Primary

Playfair Display

Secondary

Inter

State Management

Minimal

React Context only unless justified.

Forms

React Hook Form

Zod validation

Deployment

Vercel

Future backend compatibility:

Medusa.js

Coding Standards

No shortcuts.

No duplicated components.

No inline styling.

Every component reusable.

Every page server-rendered where appropriate.

Strict TypeScript.

Zero ESLint warnings.

Zero TypeScript errors.

Follow clean architecture.

Performance Targets

Lighthouse

Performance ≥98

SEO ≥100

Accessibility ≥100

Best Practices ≥100

CLS <0.1

LCP <2s

INP excellent

Colour Palette

Primary

Charcoal

Warm Black

Stone

Ivory

Sand

Walnut

Accent

Gold

Use restraint.

The design should feel luxurious rather than flashy.

Design Language

Large imagery

Generous spacing

Editorial typography

Minimal animations

Glass effects only where appropriate

No excessive gradients

No generic templates

The experience should feel bespoke.

Website Structure

Home

About

Our Story

Furniture Collections

Living Room

Bedroom

Dining

Office

Outdoor

Custom Furniture

Projects

Gallery

Showroom

Blog

FAQs

Request a Quote

Contact

Privacy Policy

Terms

Homepage

Hero

Large cinematic furniture image

Headline

Luxury Crafted.
Timeless Living.

Subheading

Premium furniture crafted for homes, offices and commercial spaces.

Primary CTA

Explore Collections

Secondary CTA

Request a Quote

Homepage Sections

Hero

Featured Collections

Why Lavish Haus

Craftsmanship

Featured Projects

Testimonials

Process

Latest Articles

Instagram Feed placeholder

Call to Action

Footer

Collections

Each collection should support:

Multiple images

Description

Materials

Finishes

Dimensions

Gallery

Related products

Enquiry button

WhatsApp

Request Quote

Quote Workflow

Every collection

↓

Request Quote

↓

Form

↓

Brevo

↓

Future n8n integration

No payment.

CMS

Recommend the best CMS.

Likely

Sanity

Payload

or Strapi.

Justify choice.

Implement if appropriate.

Images

All images should be optimised.

Blur placeholders.

Responsive.

Lazy loading.

WebP.

AVIF where possible.

Accessibility

WCAG AA

Keyboard navigation

Alt text

ARIA

Colour contrast

Semantic HTML

SEO

Each page unique metadata.

Canonical URLs.

OpenGraph.

Twitter Cards.

Breadcrumb schema.

Organisation schema.

LocalBusiness schema.

FAQ schema.

Article schema.

Image sitemap.

Future Commerce Preparation

Design the codebase so that later we can plug in

Medusa.js

without redesigning

Collections

Products

Categories

Customers

Orders

Inventory

Checkout

Payments

The routing structure should already anticipate future commerce.

AI Preparation

Leave clean integration points for future

AI Sales Assistant

AI Product Recommender

AI Quote Assistant

Voice Search

Semantic Search

without changing existing architecture.

Component Library

Build reusable components including

Navbar

Mega Menu

Hero

CTA

Cards

Collection Grid

Gallery

Testimonials

FAQ

Timeline

Quote Form

Footer

Buttons

Badges

Feature Cards

Stats

Breadcrumbs

Modal

Drawer

Image Carousel

Lightbox

Pagination

Animations

Elegant only.

Use Framer Motion.

No animation should exist simply because it can.

Motion should guide attention.

Blog

Prepare an SEO-first blog.

Categories

Tags

Authors

Featured Images

Related Articles

Reading Time

Search

Pagination

Structured Data

Codebase

Organise like a commercial SaaS project.

app/

components/

hooks/

lib/

services/

types/

config/

constants/

public/

styles/

content/

Deliverables

Do not rush implementation.

Begin by producing:

Information Architecture

Wireframes

Design System

Component Inventory

Folder Structure

Content Model

SEO Strategy

Technical Architecture

Future Commerce Architecture

Implementation Roadmap

Only after those have been approved should implementation begin.

Final Objective

The objective is not simply to launch lavishhaus.co.za.

The objective is to create Qzenta Commerce Framework v1—a reusable, production-grade platform for premium catalogue websites that can later evolve into full headless commerce by adding Medusa.js, without rewriting the frontend.

Every design decision should therefore maximise long-term reuse across future Qzenta client projects.

One strategic addition

Given everything we've discussed over the past few months, I would make one important enhancement that goes beyond the website itself.

Don't create this as lavishhaus.co.za.

Create it as an internal Qzenta framework.

For example:

qzenta-catalog-framework/
├── apps/
│   └── lavishhaus/
├── packages/
│   ├── ui/
│   ├── seo/
│   ├── forms/
│   ├── gallery/
│   ├── quote-engine/
│   ├── analytics/
│   └── cms/

The Lavish Haus site then becomes the first deployment of the framework, not the framework itself.

Six months from now, when another furniture client arrives, you'll be able to say, "We already have a production-grade platform," and deliver in a fraction of the time. In my view, that aligns much more closely with Qzenta's long-term strategy of building reusable digital products rather than bespoke websites for every client.