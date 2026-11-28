import type { NamedTab } from "payload";

import { textEditor } from "@/cms/editors";
import { period } from "@/cms/fields/period";

import { sectionHeading } from "./sectionHeading";

export const educationTab: NamedTab = {
  name: "education",
  label: "Education",
  fields: [
    sectionHeading(),
    {
      name: "items",
      type: "array",
      labels: { singular: "Education", plural: "Education" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "degree", type: "text", required: true, localized: true, admin: { width: "50%" } },
            { name: "institution", type: "text", required: true, localized: true, admin: { width: "50%" } },
          ],
        },
        period(),
        { name: "details", type: "richText", localized: true, editor: textEditor },
      ],
    },
    {
      name: "languagesTitle",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "languages",
      type: "array",
      labels: { singular: "Language", plural: "Languages" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "name", type: "text", required: true, localized: true, admin: { width: "50%" } },
            {
              name: "level",
              type: "text",
              required: true,
              localized: true,
              admin: { width: "50%", description: "E.g. \"B2, upper-intermediate\" or \"native\"." },
            },
          ],
        },
      ],
    },
  ],
};
