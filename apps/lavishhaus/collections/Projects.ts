import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "category"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "location", type: "text", required: true },
    { name: "category", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "coverImage", type: "upload", relationTo: "media", required: true },
    { name: "gallery", type: "upload", relationTo: "media", hasMany: true },
  ],
};
