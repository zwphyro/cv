import type { NamedTab } from "payload";

export const heroTab: NamedTab = {
  name: "hero",
  label: "Hero",
  fields: [
    {
      name: "status",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Line next to the green dot." },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Large heading. Wraps between words when it doesn't fit on one line." },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "facts",
      type: "array",
      labels: { singular: "Fact", plural: "Facts" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "value", type: "text", required: true, localized: true, admin: { width: "40%" } },
            { name: "caption", type: "text", required: true, localized: true, admin: { width: "60%" } },
          ],
        },
        {
          name: "highlighted",
          type: "checkbox",
          label: "Show the value in the accent colour",
          defaultValue: false,
        },
      ],
    },
  ],
};
