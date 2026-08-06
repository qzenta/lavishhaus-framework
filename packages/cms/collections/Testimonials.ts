import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "author", type: "text", required: true },
    { name: "role", type: "text", required: true },
  ],
};
