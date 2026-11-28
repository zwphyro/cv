import type { MetadataRoute } from "next";
import { connection } from "next/server";

import { env } from "@/lib/env";

export default async function robots(): Promise<MetadataRoute.Robots> {
  await connection();

  if (!env.FRONTEND_INDEXING_ENABLED) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: env.FRONTEND_PUBLIC_URL ? new URL("/sitemap.xml", env.FRONTEND_PUBLIC_URL).href : undefined,
  };
}
