import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { textEditor } from "@/cms/editors";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/locales";
import { env } from "@/lib/env";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Homepage } from "./globals/Homepage/Homepage";
import { Site } from "./globals/Site";

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
  globals: [Site, Homepage],
  editor: textEditor,
  localization: {
    locales: LOCALES.map(({ code, label }) => ({ code, label })),
    defaultLocale: DEFAULT_LOCALE,
    fallback: true,
  },
  secret: env.CMS_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      user: env.CMS_DB_USER,
      password: env.CMS_DB_PASSWORD,
      database: env.CMS_DB_NAME,
    },
    push: false,
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: env.S3_BUCKET,
      config: {
        endpoint: env.S3_ENDPOINT,
        region: env.S3_REGION,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID,
          secretAccessKey: env.S3_SECRET_ACCESS_KEY,
        },
        forcePathStyle: true,
      },
    }),
  ],
  onInit: async (payload) => {
    const email = env.CMS_ADMIN_EMAIL;
    const password = env.CMS_ADMIN_PASSWORD;

    if (!email || !password) {
      return;
    }

    const { totalDocs } = await payload.count({ collection: "users" });

    if (totalDocs > 0) {
      return;
    }

    await payload.create({
      collection: "users",
      data: { email, password },
    });

    payload.logger.info(`Created admin user ${email}`);
  },
});
