import type { Homepage, Media, Site } from "@/payload-types";

import type { Asset } from "./asset";
import type { Markdown } from "./markdown";

type OmittedKey = "id" | "updatedAt" | "createdAt" | "globalType";

// Upload fields are typed as `number | Media`: the seed points at a file instead of an id
type SeedValue<T> = Media extends T ? Asset | Exclude<T, number | Media> : SeedPlainValue<T>;

type SeedPlainValue<T> =
  T extends { root: unknown } ? Markdown
  : T extends (infer Item)[] ? SeedValue<Item>[]
  : T extends object ? SeedDoc<T>
  : T;

export type SeedDoc<T> = { [Key in keyof T as Key extends OmittedKey ? never : Key]: SeedValue<T[Key]> };

export type SeedSite = SeedDoc<Site>;
export type SeedHomepage = SeedDoc<Homepage>;
