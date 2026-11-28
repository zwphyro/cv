import type { Block } from "payload";
import { z } from "zod";

const statProps = z.object({
  value: z.string(),
  caption: z.string(),
});

export const StatBlock: Block = {
  slug: "stat",
  interfaceName: "StatBlock",
  labels: { singular: "Stat", plural: "Stats" },
  fields: [
    {
      name: "value",
      type: "text",
      required: true,
      admin: { description: "A short headline number, e.g. \"3 h -> 10 min\"." },
    },
    {
      name: "caption",
      type: "textarea",
      required: true,
      admin: { description: "What the number means." },
    },
  ],
  jsx: {
    import: ({ props }) => statProps.parse(props),
    export: ({ fields }) => ({ props: statProps.parse(fields) }),
  },
};
