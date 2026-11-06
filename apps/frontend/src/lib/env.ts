import { z } from "zod";

const blankAsUndefined = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema);

const required = z.string({ error: "is not set" }).min(1, "is not set");

const port = z
  .string({ error: "is not set" })
  .regex(/^\d+$/, "must be a number")
  .transform(Number)
  .pipe(z.number().int().min(1).max(65535));

const schema = z
  .object({
    POSTGRES_HOST: required,
    POSTGRES_PORT: port,
    CMS_DB_NAME: required,
    CMS_DB_USER: required,
    CMS_DB_PASSWORD: required,
    CMS_SECRET: required,
    CMS_ADMIN_EMAIL: blankAsUndefined(z.email().optional()),
    CMS_ADMIN_PASSWORD: blankAsUndefined(z.string().optional()),
    S3_ENDPOINT: blankAsUndefined(z.url({ protocol: /^https?$/ }).optional()),
    S3_REGION: blankAsUndefined(z.string().default("us-east-1")),
    S3_BUCKET: required,
    S3_ACCESS_KEY_ID: required,
    S3_SECRET_ACCESS_KEY: required,
  })
  .refine((env) => Boolean(env.CMS_ADMIN_EMAIL) === Boolean(env.CMS_ADMIN_PASSWORD), {
    message: "CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD must be set together",
    path: ["CMS_ADMIN_EMAIL"],
  });

type Env = z.infer<typeof schema>;

function loadEnv(): Env {
  // `next build` imports payload.config without runtime variables; the values are never used there
  if (process.env.SKIP_ENV_VALIDATION) {
    return process.env as unknown as Env;
  }

  const result = schema.safeParse(process.env);
  if (!result.success) {
    throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const env = loadEnv();
