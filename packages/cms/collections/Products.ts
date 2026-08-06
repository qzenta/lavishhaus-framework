import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "productCollection"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "productCollection",
      type: "relationship",
      relationTo: "product-collections",
      required: true,
    },
    { name: "shortDescription", type: "textarea", required: true },
    { name: "images", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "dimensions",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    { name: "leadTime", type: "text" },
  ],
};
