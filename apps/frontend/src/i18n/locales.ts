export interface LocaleDescriptor {
  code: string;
  htmlLang: string;
  ogLocale: string;
  label: string;
}

export const LOCALES = [
  { code: "en", htmlLang: "en", ogLocale: "en_US", label: "English" },
] as const satisfies readonly LocaleDescriptor[];

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "en";

const DESCRIPTORS = Object.fromEntries(
  LOCALES.map((locale) => [locale.code, locale]),
) as Record<Locale, LocaleDescriptor>;

export function getLocaleDescriptor(code: Locale) {
  return DESCRIPTORS[code];
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && Object.hasOwn(DESCRIPTORS, value);
}
