import type { UiStrings } from "@/i18n/strings";
import { getApiErrorCode } from "@/lib/api/errors";

import type { ContactValues } from "./contactSchema";
import { VerificationError } from "./useTurnstileToken";

interface ValidationIssue {
  loc?: (string | number)[];
  msg?: string;
}

const FIELDS = new Set<string>(["author", "email", "message"] satisfies (keyof ContactValues)[]);

export function submitErrorMessage(error: unknown, strings: UiStrings["contactForm"]) {
  const code = getApiErrorCode(error);
  if (error instanceof VerificationError || code === "captcha_failed") return strings.verificationFailed;
  if (code === "rate_limited") return strings.tooManyRequests;
  return strings.sendFailed;
}

export function validationErrors(error: unknown, strings: UiStrings["contactForm"]) {
  const detail = (error as { detail?: unknown } | null | undefined)?.detail;
  if (!Array.isArray(detail)) return [];

  return (detail as ValidationIssue[]).flatMap(({ loc, msg }) => {
    const field = String(loc?.at(-1));
    if (!FIELDS.has(field) || !msg) return [];
    return [{ field: field as keyof ContactValues, message: field === "email" ? strings.emailInvalid : msg }];
  });
}
