import type { Locale } from "@/i18n/locales";

interface Period {
  start: string;
  start_tz: string;
  end?: string | null;
  end_tz?: string | null;
}

function formatMonth(date: string, timeZone: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone }).format(new Date(date));
}

export function formatPeriod(period: Period, locale: Locale, presentLabel: string) {
  const start = formatMonth(period.start, period.start_tz, locale);
  const end = period.end ? formatMonth(period.end, period.end_tz ?? period.start_tz, locale) : presentLabel;
  return `${start} — ${end}`;
}
