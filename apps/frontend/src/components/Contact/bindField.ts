import type { AnyFieldApi } from "@tanstack/react-form";
import type { ChangeEvent } from "react";

function firstErrorMessage(errors: unknown[]) {
  const error = errors.find(Boolean);
  if (typeof error === "string") return error;
  return (error as { message?: string } | undefined)?.message;
}

export function bindField(field: AnyFieldApi) {
  const showError = field.state.meta.isBlurred || field.form.state.submissionAttempts > 0;

  return {
    name: String(field.name),
    value: field.state.value as string,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // A server error refers to the submitted value, so it goes away once the visitor edits the field
      if (field.state.meta.errorMap.onServer) {
        field.setMeta((meta) => ({ ...meta, errorMap: { ...meta.errorMap, onServer: undefined } }));
      }
      field.handleChange(event.target.value);
    },
    onBlur: () => {
      field.handleBlur();
      void field.validate("change");
    },
    error: showError ? firstErrorMessage(field.state.meta.errors) : undefined,
  };
}
