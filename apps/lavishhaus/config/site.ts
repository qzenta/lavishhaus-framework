// Business facts here are tracked in docs/lavishhaus-facts.md. Don't add
// hours, accounts or claims without a client-supplied source.
export const siteConfig = {
  name: "Lavish Haus",
  tagline: "Furniture made for the way you live.",
  description:
    "Lavish Haus is a Johannesburg furniture showroom for statement beds, TV walls, dining sets and bespoke pieces made by MicWood Furnitures. Request a quote online or on WhatsApp.",
  keywords: [
    "furniture Johannesburg",
    "furniture showroom Randburg",
    "upholstered beds Johannesburg",
    "TV wall units",
    "bespoke furniture",
    "custom furniture South Africa",
    "MicWood Furnitures",
  ],
  url: "https://www.lavishhaus.co.za",
  ogImage: "/og-image.jpg",
  manufacturer: "MicWood Furnitures",
  contact: {
    email: "info@lavishhaus.co.za",
    salesEmail: "sales@lavishhaus.co.za",
    phone: "+27 78 355 6579",
    whatsapp: "27783556579",
  },
  showroom: {
    name: "Lavish Haus Showroom",
    streetAddress: "635 Ontdekkers Road",
    addressLocality: "Delarey, Randburg",
    addressRegion: "Gauteng",
    postalCode: "2114",
    addressCountry: "ZA",
    // Opening hours unconfirmed (F-04); pages ask visitors to arrange a visit.
    visitNote: "Please contact us to arrange a visit.",
  },
  // Unconfirmed accounts (F-18) stay empty and are hidden wherever they're used.
  social: {
    instagram: "",
    facebook: "",
    pinterest: "",
  },
} as const;
