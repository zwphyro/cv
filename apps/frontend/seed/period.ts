export function period(start: string, end?: string) {
  return {
    start: `${start}-01T00:00:00.000Z`,
    start_tz: "UTC",
    end: end ? `${end}-01T00:00:00.000Z` : null,
    end_tz: end ? "UTC" : null,
  } as const;
}
