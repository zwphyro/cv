import type { NamedTab } from "payload";

import { textEditor } from "@/cms/editors";

import { sectionHeading } from "./sectionHeading";

export const contactTab: NamedTab = {
  name: "contact",
  label: "Contact",
  fields: [
    sectionHeading(),
    {
      name: "body",
      type: "richText",
      required: true,
      localized: true,
      editor: textEditor,
      admin: { description: "The first paragraph is shown larger." },
    },
    {
      name: "formTitle",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "successMessage",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Shown under \"Message sent\" after the form is submitted." },
    },
  ],
};
