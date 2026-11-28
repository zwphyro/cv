import type { NamedTab } from "payload";

import { storyEditor } from "@/cms/editors";
import { period } from "@/cms/fields/period";

import { sectionHeading } from "./sectionHeading";

const stack = {
  name: "stack",
  type: "text",
  hasMany: true,
  admin: { description: "Technologies, listed in one line." },
} as const;

export const experienceTab: NamedTab = {
  name: "experience",
  label: "Experience",
  fields: [
    sectionHeading(),
    {
      name: "jobs",
      type: "array",
      labels: { singular: "Job", plural: "Jobs" },
      admin: { description: "Newest first." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "position", type: "text", required: true, localized: true, admin: { width: "50%" } },
            { name: "company", type: "text", required: true, localized: true, admin: { width: "50%" } },
          ],
        },
        period(),
        { name: "location", type: "text", localized: true },
        {
          name: "body",
          type: "richText",
          localized: true,
          editor: storyEditor,
          admin: { description: "Free text. Stat and Metrics blocks can be inserted anywhere." },
        },
        {
          name: "projects",
          type: "array",
          labels: { singular: "Project", plural: "Projects" },
          admin: { description: "Separate stories within this job, each with its own dates." },
          fields: [
            { name: "title", type: "text", required: true, localized: true },
            period(),
            { name: "body", type: "richText", localized: true, editor: storyEditor },
            stack,
          ],
        },
        stack,
      ],
    },
  ],
};
