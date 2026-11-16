import type { NamedTab } from "payload";

import { sectionHeading } from "./sectionHeading";

export const skillsTab: NamedTab = {
  name: "skills",
  label: "Skills",
  fields: [
    sectionHeading(),
    {
      name: "intro",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "groups",
      type: "array",
      labels: { singular: "Group", plural: "Groups" },
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        {
          name: "items",
          type: "array",
          labels: { singular: "Skill", plural: "Skills" },
          admin: { description: "Main stack first. The bar length grows with the years of use." },
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", required: true, admin: { width: "30%" } },
                {
                  name: "since",
                  type: "number",
                  required: true,
                  min: 1990,
                  max: 2100,
                  admin: { width: "20%", description: "Year you started using it in production." },
                },
                { name: "note", type: "text", localized: true, admin: { width: "50%" } },
              ],
            },
          ],
        },
        {
          name: "also",
          type: "text",
          hasMany: true,
          admin: { description: "Other tools of the group, listed in one line." },
        },
      ],
    },
  ],
};
