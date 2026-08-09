import type { CollectionConfig } from "payload";

export const ProductCollections: CollectionConfig = {
  slug: "product-collections",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "featured"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "category", type: "relationship", relationTo: "categories", required: true },
    { name: "tagline", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "story", type: "textarea" },
    { name: "heroImage", type: "upload", relationTo: "media", required: true },
    { name: "gallery", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "materials",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "description", type: "text" },
      ],
    },
    {
      name: "finishes",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "swatch", type: "text" },
      ],
    },
    {
      name: "relatedCollections",
      type: "relationship",
      relationTo: "product-collections",
      hasMany: true,
    },
    { name: "featured", type: "checkbox", defaultValue: false },
  ],
};
