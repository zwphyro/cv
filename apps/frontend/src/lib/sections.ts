import type { Homepage } from "@/payload-types";

export const SECTION_IDS = ["skills", "experience", "education", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface NavSection {
  id: SectionId;
  label: string;
}

export function getNavSections(homepage: Homepage): NavSection[] {
  return SECTION_IDS.map((id) => ({ id, label: homepage[id].navLabel }));
}
