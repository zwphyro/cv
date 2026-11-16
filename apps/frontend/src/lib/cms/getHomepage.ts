import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/locales";

import { CACHE_TAGS } from "./cacheTags";
import { getPayloadClient } from "./getPayloadClient";

export const getHomepage = unstable_cache(
  async (locale: Locale) => {
    const payload = await getPayloadClient();
    return payload.findGlobal({ slug: "homepage", locale, depth: 0 });
  },
  ["cms", "homepage"],
  { tags: [CACHE_TAGS.homepage] },
);
