import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { ProductCollections } from "./collections/ProductCollections";
import { Products } from "./collections/Products";
import { Projects } from "./collections/Projects";
import { Testimonials } from "./collections/Testimonials";
import { Faqs } from "./collections/Faqs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    ProductCollections,
    Products,
    Projects,
    Testimonials,
    Faqs,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./cms.db",
    },
  }),
  sharp,
});
