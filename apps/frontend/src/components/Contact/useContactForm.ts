import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import type { UiStrings } from "@/i18n/strings";
import { browserApi } from "@/lib/api/browserApi";

import { createContactSchema, EMPTY_CONTACT } from "./contactSchema";
import { submitErrorMessage, validationErrors } from "./submitErrors";
import { useTurnstileToken } from "./useTurnstileToken";

export type ContactPhase = "form" | "verifying" | "sending" | "sent";

export function useContactForm(strings: UiStrings["contactForm"]) {
  const schema = createContactSchema(strings);
  const turnstile = useTurnstileToken();
  const send = browserApi.query.useMutation("post", "/api/v1/requests");
  const [phase, setPhase] = useState<ContactPhase>("form");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: EMPTY_CONTACT,
    validators: { onChange: schema },
    onSubmit: async ({ value, formApi }) => {
      setSubmitError(null);
      setPhase("verifying");
      try {
        const token = await turnstile.getToken();
        setPhase("sending");
        await send.mutateAsync({
          params: { header: { "X-Captcha-Token": token } },
          body: schema.parse(value),
        });
        setPhase("sent");
      } catch (error) {
        turnstile.reset();
        const fieldErrors = validationErrors(error, strings);
        for (const { field, message } of fieldErrors) {
          formApi.setFieldMeta(field, (meta) => ({ ...meta, errorMap: { ...meta.errorMap, onServer: message } }));
        }
        setSubmitError(fieldErrors.length > 0 ? null : submitErrorMessage(error, strings));
        setPhase("form");
      }
    },
  });

  const startOver = () => {
    form.reset();
    send.reset();
    setPhase("form");
  };

  return { form, phase, submitError, turnstile, startOver };
}
