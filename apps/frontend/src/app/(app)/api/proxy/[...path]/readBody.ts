import type { NextRequest } from "next/server";

export class BodyTooLargeError extends Error {}

// Content-Length can lie, so the stream itself is cut off at the limit too
export async function readBody(request: NextRequest, maxBytes: number) {
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes) throw new BodyTooLargeError();
  if (!request.body) return undefined;

  const reader = request.body.getReader();
  const chunks: Uint8Array<ArrayBuffer>[] = [];
  let size = 0;

  for (let result = await reader.read(); !result.done; result = await reader.read()) {
    size += result.value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new BodyTooLargeError();
    }
    chunks.push(new Uint8Array(result.value));
  }
  return new Blob(chunks);
}
