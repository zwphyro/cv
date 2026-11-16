import { revalidateTag as nextRevalidateTag } from "next/cache";
import type { PayloadRequest } from "payload";

export function revalidateTag(tag: string) {
  return ({ req }: { req: PayloadRequest }) => {
    try {
      nextRevalidateTag(tag, { expire: 0 });
    } catch (error) {
      // Saves made outside Next.js (seed, CLI scripts) have no cache to clear
      req.payload.logger.warn(`Skipped revalidating "${tag}": ${String(error)}`);
    }
  };
}
