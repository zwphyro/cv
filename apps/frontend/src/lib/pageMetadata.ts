import type { Metadata } from "next";

import { getLocaleDescriptor, type Locale } from "@/i18n/locales";
import { env } from "@/lib/env";
import type { Site } from "@/payload-types";

export function buildPageMetadata(site: Site, locale: Locale): Metadata {
  const { title, description } = site.seo;
  const publicUrl = env.FRONTEND_PUBLIC_URL;

  return {
    metadataBase: publicUrl ? new URL(publicUrl) : undefined,
    title,
    description,
    alternates: publicUrl ? { canonical: "/" } : undefined,
    openGraph: {
      type: "website",
      title,
      description,
      siteName: site.name,
      locale: getLocaleDescriptor(locale).ogLocale,
      url: publicUrl ? "/" : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: env.FRONTEND_INDEXING_ENABLED ? undefined : { index: false, follow: false },
  };
}
