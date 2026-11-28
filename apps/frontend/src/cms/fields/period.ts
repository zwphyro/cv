import type { DateField, DateFieldValidation, RowField } from "payload";

const endNotBeforeStart: DateFieldValidation = (value, { siblingData }) => {
  const { start } = siblingData as { start?: string | null };
  if (!value || !start) return true;

  return new Date(value) >= new Date(start) || "The end can't be earlier than the start.";
};

function monthField(field: Pick<DateField, "name" | "label" | "required" | "validate">, description?: string): DateField {
  return {
    ...field,
    type: "date",
    timezone: {
      defaultTimezone: "UTC",
      supportedTimezones: [{ label: "UTC", value: "UTC" }],
    },
    admin: {
      width: "50%",
      description,
      date: { pickerAppearance: "monthOnly", displayFormat: "MMM yyyy" },
    },
  };
}

export function period(): RowField {
  return {
    type: "row",
    fields: [
      monthField({ name: "start", label: "Start", required: true }),
      monthField({ name: "end", label: "End", validate: endNotBeforeStart }, "Leave empty if it is still ongoing."),
    ],
  };
}
