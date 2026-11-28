import type { MetadataRoute } from "next";
import { connection } from "next/server";

import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  if (!env.FRONTEND_INDEXING_ENABLED || !env.FRONTEND_PUBLIC_URL) return [];

  return [{ url: new URL("/", env.FRONTEND_PUBLIC_URL).href, changeFrequency: "monthly", priority: 1 }];
}
