import { access } from "node:fs/promises";

import config from "@payload-config";

import { homepage } from "./content/homepage/en";
import { site } from "./content/site/en";
import { createMarkdownConverter } from "./convertMarkdown";
import { convertSeedToPayloadData, type SeedConverters } from "./convertSeedToPayloadData";

const converters: SeedConverters = {
  markdown: await createMarkdownConverter(await config),
  asset: (source) => access(source.path),
};

await convertSeedToPayloadData(site, converters);
await convertSeedToPayloadData(homepage, converters);

console.log("CMS seed content is valid");
process.exit(0);
