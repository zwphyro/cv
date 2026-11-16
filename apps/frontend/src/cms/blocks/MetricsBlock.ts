import type { Block, NumberFieldSingleValidation } from "payload";
import { z } from "zod";

const metricsProps = z.object({
  label: z.string(),
  items: z.array(z.object({
    name: z.string(),
    value: z.number(),
    min: z.number().default(0),
    max: z.number().default(100),
    suffix: z.string().optional(),
    showMax: z.boolean().default(false),
  })),
});

const withinRange: NumberFieldSingleValidation = (value, { siblingData }) => {
  const { min, max } = siblingData as { min?: number | null; max?: number | null };
  if (value === null || value === undefined) return "Enter a value.";
  if (min !== null && min !== undefined && value < min) return "The value can't be lower than the minimum.";
  if (max !== null && max !== undefined && value > max) return "The value can't be higher than the maximum.";
  return true;
};

const maxAboveMin: NumberFieldSingleValidation = (value, { siblingData }) => {
  const { min } = siblingData as { min?: number | null };
  if (value === null || value === undefined) return "Enter the maximum.";
  return min === null || min === undefined || value > min || "The maximum must be higher than the minimum.";
};

export const MetricsBlock: Block = {
  slug: "metrics",
  interfaceName: "MetricsBlock",
  labels: { singular: "Metrics", plural: "Metrics" },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      admin: { description: "Heading of the panel, e.g. \"Lighthouse scores\"." },
    },
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      labels: { singular: "Metric", plural: "Metrics" },
      admin: { initCollapsed: false },
      fields: [
        { name: "name", type: "text", required: true },
        {
          type: "row",
          fields: [
            { name: "value", type: "number", required: true, validate: withinRange, admin: { width: "25%" } },
            { name: "min", type: "number", required: true, defaultValue: 0, admin: { width: "25%" } },
            { name: "max", type: "number", required: true, defaultValue: 100, validate: maxAboveMin, admin: { width: "25%" } },
            {
              name: "suffix",
              type: "text",
              admin: { width: "25%", description: "Shown right after the value, e.g. \"%\" or \" ms\"." },
            },
          ],
        },
        {
          name: "showMax",
          type: "checkbox",
          label: "Show the maximum after the value (\"98 / 100\")",
          defaultValue: false,
        },
      ],
    },
  ],
  jsx: {
    import: ({ props }) => metricsProps.parse(props),
    export: ({ fields }) => ({ props: metricsProps.parse(fields) }),
  },
};
