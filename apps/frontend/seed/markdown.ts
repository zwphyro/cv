import { readFileSync } from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(import.meta.dirname, "content");

export interface Markdown {
  kind: "markdown";
  file: string;
  text: string;
}

export function markdown(file: string): Markdown {
  return { kind: "markdown", file, text: readFileSync(path.join(CONTENT_DIR, file), "utf8") };
}

export function isMarkdown(value: unknown): value is Markdown {
  return typeof value === "object" && value !== null && (value as Partial<Markdown>).kind === "markdown";
}
