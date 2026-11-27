import { z } from "zod";

import type { UiStrings } from "@/i18n/strings";
import { fillTemplate } from "@/i18n/template";
import type { components } from "@/lib/api/v1";

export type ContactValues = components["schemas"]["CreateRequestRequest"];

// Keep in sync with apps/backend/src/entity/request.py
export const CONTACT_LIMITS = {
  author: 100,
  email: 254,
  message: 5000,
} as const satisfies Record<keyof ContactValues, number>;

export const EMPTY_CONTACT: ContactValues = { author: "", email: "", message: "" };

function requiredText(max: number, required: string, tooLong: string) {
  return z.string().trim().min(1, required).max(max, fillTemplate(tooLong, { max }));
}

export function createContactSchema(strings: UiStrings["contactForm"]) {
  return z.object({
    author: requiredText(CONTACT_LIMITS.author, strings.authorRequired, strings.authorTooLong),
    email: requiredText(CONTACT_LIMITS.email, strings.emailRequired, strings.emailTooLong)
      .pipe(z.email(strings.emailInvalid)),
    message: requiredText(CONTACT_LIMITS.message, strings.messageRequired, strings.messageTooLong),
  });
}
