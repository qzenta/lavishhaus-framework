import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Placeholder collections retired in the Oct 2026 catalog rebuild, mapped to
// the collection that now holds the same kind of photographed piece.
const retiredCollections: Record<string, string> = {
  "/collections/living-room/aurelia-sofa-collection": "/collections/living-room/sofas-and-seating",
  "/collections/living-room/marchetti-coffee-table": "/collections/living-room/consoles-and-tables",
  "/collections/bedroom/linden-bed-frame": "/collections/bedroom/upholstered-beds",
  "/collections/bedroom/porter-nightstand": "/collections/bedroom/bedroom-suites",
  "/collections/bedroom/palazzo-bedroom-suite": "/collections/bedroom/bedroom-suites",
  "/collections/dining/hollis-dining-table": "/collections/dining/dining-sets",
  "/collections/dining/reyes-dining-chair": "/collections/dining/dining-sets",
  "/collections/office/carrow-writing-desk": "/collections/office/desks",
  "/collections/outdoor/solano-outdoor-lounge": "/collections/outdoor",
  "/collections/kitchen/micwood-kitchen-island": "/collections/kitchen/kitchen-islands",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...Object.entries(retiredCollections).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // The placeholder projects weren't real. Temporary, so /projects can
      // return once client-confirmed projects exist.
      { source: "/projects", destination: "/collections/custom-furniture/bespoke-commissions", permanent: false },
      { source: "/projects/:slug", destination: "/collections/custom-furniture/bespoke-commissions", permanent: false },
    ];
  },
};

export default withPayload(nextConfig);
