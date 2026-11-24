import { stat } from "node:fs/promises";

import type { Payload, RequestContext } from "payload";

import type { Asset } from "./asset";

async function upload(payload: Payload, { file, path: filePath, alt }: Asset, context: RequestContext) {
  const { size } = await stat(filePath);
  const { docs } = await payload.find({
    collection: "media",
    where: { filename: { equals: file } },
    limit: 1,
    depth: 0,
  });
  const existing = docs.at(0);

  if (existing?.filesize === size) return existing.id;
  if (existing) {
    const updated = await payload.update({ collection: "media", id: existing.id, filePath, data: { alt }, context });
    return updated.id;
  }

  const created = await payload.create({ collection: "media", filePath, data: { alt }, context });
  return created.id;
}

// The same file can be referenced from several places, so each one is uploaded once
export function createAssetUploader(payload: Payload, context: RequestContext) {
  const uploads = new Map<string, Promise<number>>();

  return (source: Asset) => {
    const pending = uploads.get(source.file) ?? upload(payload, source, context);
    uploads.set(source.file, pending);
    return pending;
  };
}
