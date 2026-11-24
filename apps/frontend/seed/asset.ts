import path from "node:path";

const ASSETS_DIR = path.join(import.meta.dirname, "assets");

export interface Asset {
  kind: "asset";
  file: string;
  path: string;
  alt?: string;
}

export function asset(file: string, options: { alt?: string } = {}): Asset {
  return { kind: "asset", file, path: path.join(ASSETS_DIR, file), alt: options.alt };
}

export function isAsset(value: unknown): value is Asset {
  return typeof value === "object" && value !== null && (value as Partial<Asset>).kind === "asset";
}
