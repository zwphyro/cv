import type { GlobalConfig } from "payload";

import { revalidateTag } from "@/cms/hooks/revalidateTag";
import { CACHE_TAGS } from "@/lib/cms/cacheTags";

export const Site: GlobalConfig = {
  slug: "site",
  label: "Site settings",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateTag(CACHE_TAGS.site)],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Your name as shown in the header, hero and footer." },
    },
    {
      name: "seo",
      label: "Search and link previews",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        { name: "description", type: "textarea", required: true, localized: true },
      ],
    },
    {
      name: "cv",
      label: "CV (PDF)",
      type: "upload",
      relationTo: "media",
      localized: true,
      filterOptions: { mimeType: { equals: "application/pdf" } },
      admin: { description: "The file behind the \"Download CV\" button. Each language can have its own." },
    },
    {
      name: "contacts",
      type: "array",
      labels: { singular: "Contact", plural: "Contacts" },
      admin: { description: "Listed in the footer in this order." },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "kind",
              type: "select",
              required: true,
              options: ["email", "telegram", "phone", "linkedin", "github", "other"],
              admin: { width: "33%", description: "Email gets a Copy button." },
            },
            {
              name: "label",
              type: "text",
              required: true,
              localized: true,
              admin: { width: "33%" },
            },
            {
              name: "quickContact",
              type: "select",
              required: true,
              defaultValue: "none",
              options: [
                { label: "Not shown", value: "none" },
                { label: "Primary button", value: "primary" },
                { label: "Secondary button", value: "secondary" },
              ],
              admin: { width: "33%", description: "Button in the mobile menu." },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              required: true,
              admin: { width: "50%", description: "What visitors see, e.g. \"@mstarodubovdev\"." },
            },
            {
              name: "href",
              type: "text",
              required: true,
              admin: { width: "50%", description: "Where the link leads, e.g. \"https://t.me/mstarodubovdev\"." },
            },
          ],
        },
      ],
    },
  ],
};
