import type { CollectionConfig, TextFieldSingleValidation } from "payload";

import { revalidateTag } from "@/cms/hooks/revalidateTag";
import { CACHE_TAGS } from "@/lib/cms/cacheTags";

const requiredForImages: TextFieldSingleValidation = (value, { data }) => {
  const { mimeType } = data as { mimeType?: string | null };
  return Boolean(value) || !mimeType?.startsWith("image/") || "Describe the image for screen readers.";
};

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateTag(CACHE_TAGS.site)],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      validate: requiredForImages,
      admin: { description: "Required for images, not needed for PDF files." },
    },
  ],
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
  },
};
