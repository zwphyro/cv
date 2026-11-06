function required(name: string): string {
  const value = process.env[name];
  if (!value && !process.env.SKIP_ENV_VALIDATION) {
    throw new Error(`${name} is not set`);
  }
  return value ?? "";
}

function optional(name: string, defaultValue = ""): string {
  return process.env[name] ?? defaultValue;
}

function port(name: string): number {
  const value = required(name);
  const port = Number(value);
  if ((!/^\d+$/.test(value) || port < 1 || port > 65535) && !process.env.SKIP_ENV_VALIDATION) {
    throw new Error(`${name} must be a port number (1-65535), got "${value}"`);
  }
  return port;
}

export const env = {
  get postgresHost() {
    return required("POSTGRES_HOST");
  },
  get postgresPort() {
    return port("POSTGRES_PORT");
  },
  get cmsDbName() {
    return required("CMS_DB_NAME");
  },
  get cmsDbUser() {
    return required("CMS_DB_USER");
  },
  get cmsDbPassword() {
    return required("CMS_DB_PASSWORD");
  },
  get cmsSecret() {
    return required("CMS_SECRET");
  },
  cmsAdminEmail: optional("CMS_ADMIN_EMAIL"),
  cmsAdminPassword: optional("CMS_ADMIN_PASSWORD"),
  s3Endpoint: optional("S3_ENDPOINT") || undefined,
  s3Region: optional("S3_REGION", "us-east-1"),
  get s3Bucket() {
    return required("S3_BUCKET");
  },
  get s3AccessKeyId() {
    return required("S3_ACCESS_KEY_ID");
  },
  get s3SecretAccessKey() {
    return required("S3_SECRET_ACCESS_KEY");
  },
} as const;
