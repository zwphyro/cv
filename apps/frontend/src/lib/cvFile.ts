import type { Site } from "@/payload-types";

export interface CvFile {
  url: string;
  filename: string;
}

export function getCvFile(site: Site): CvFile | null {
  if (typeof site.cv !== "object" || !site.cv?.url || !site.cv.filename) return null;
  return { url: site.cv.url, filename: site.cv.filename };
}
