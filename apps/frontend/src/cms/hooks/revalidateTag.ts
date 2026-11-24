import { revalidateTag as nextRevalidateTag } from "next/cache";
import type { RequestContext } from "payload";

export const SKIP_REVALIDATION = "skipRevalidation";

export function revalidateTag(tag: string) {
  return ({ context }: { context: RequestContext }) => {
    if (context[SKIP_REVALIDATION]) return;
    nextRevalidateTag(tag, { expire: 0 });
  };
}
