import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/locales";

import { CACHE_TAGS } from "./cacheTags";
import { getPayloadClient } from "./getPayloadClient";

export const getSite = unstable_cache(
  async (locale: Locale) => {
    const payload = await getPayloadClient();
    return payload.findGlobal({ slug: "site", locale, depth: 1 });
  },
  ["cms", "site"],
  { tags: [CACHE_TAGS.site] },
);
