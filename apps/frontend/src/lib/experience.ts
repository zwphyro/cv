import type { Homepage } from "@/payload-types";

export type Job = NonNullable<Homepage["experience"]["jobs"]>[number];
