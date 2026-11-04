import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.CMS_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      host: process.env.POSTGRES_HOST ?? "",
      port: Number(process.env.POSTGRES_PORT ?? 5432),
      user: process.env.CMS_DB_USER ?? "",
      password: process.env.CMS_DB_PASSWORD ?? "",
      database: process.env.CMS_DB_NAME ?? "",
    },
    push: false,
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET ?? "",
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY ?? "",
          secretAccessKey: process.env.S3_SECRET_KEY ?? "",
        },
        forcePathStyle: true,
      },
    }),
  ],
});
