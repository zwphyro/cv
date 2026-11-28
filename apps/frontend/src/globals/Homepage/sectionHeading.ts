import type { RowField } from "payload";

export function sectionHeading(): RowField {
  return {
    type: "row",
    fields: [
      {
        name: "title",
        type: "text",
        required: true,
        localized: true,
        admin: { width: "50%", description: "Section heading." },
      },
      {
        name: "navLabel",
        label: "Navigation label",
        type: "text",
        required: true,
        localized: true,
        admin: { width: "50%", description: "Menu item that leads to this section." },
      },
    ],
  };
}
