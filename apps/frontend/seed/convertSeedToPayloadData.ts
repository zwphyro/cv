import { type Asset, isAsset } from "./asset";
import { isMarkdown, type Markdown } from "./markdown";

export interface SeedConverters {
  markdown: (source: Markdown) => unknown;
  asset: (source: Asset) => Promise<unknown>;
}

export async function convertSeedToPayloadData(value: unknown, converters: SeedConverters): Promise<unknown> {
  if (isMarkdown(value)) return converters.markdown(value);
  if (isAsset(value)) return converters.asset(value);
  if (Array.isArray(value)) return Promise.all(value.map((item) => convertSeedToPayloadData(item, converters)));
  if (typeof value === "object" && value !== null) {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, item]) => [key, await convertSeedToPayloadData(item, converters)]),
    );
    return Object.fromEntries(entries);
  }
  return value;
}
