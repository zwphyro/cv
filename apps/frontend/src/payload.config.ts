import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { env } from "@/lib/env";

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
  secret: env.cmsSecret,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      host: env.postgresHost,
      port: env.postgresPort,
      user: env.cmsDbUser,
      password: env.cmsDbPassword,
      database: env.cmsDbName,
    },
    push: false,
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: env.s3Bucket,
      config: {
        endpoint: env.s3Endpoint,
        region: env.s3Region,
        credentials: {
          accessKeyId: env.s3AccessKeyId,
          secretAccessKey: env.s3SecretAccessKey,
        },
        forcePathStyle: true,
      },
    }),
  ],
  onInit: async (payload) => {
    const email = env.cmsAdminEmail;
    const password = env.cmsAdminPassword;

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
