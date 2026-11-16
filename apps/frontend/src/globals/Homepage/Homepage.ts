import type { GlobalConfig } from "payload";

import { revalidateTag } from "@/cms/hooks/revalidateTag";
import { CACHE_TAGS } from "@/lib/cms/cacheTags";

import { contactTab } from "./contactTab";
import { educationTab } from "./educationTab";
import { experienceTab } from "./experienceTab";
import { heroTab } from "./heroTab";
import { skillsTab } from "./skillsTab";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateTag(CACHE_TAGS.homepage)],
  },
  fields: [
    {
      type: "tabs",
      tabs: [heroTab, skillsTab, experienceTab, educationTab, contactTab],
    },
  ],
};
