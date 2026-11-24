import config from "@payload-config";
import { getPayload } from "payload";

import { SKIP_REVALIDATION } from "@/cms/hooks/revalidateTag";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import type { Homepage, Site } from "@/payload-types";

import { homepage } from "./content/homepage/en";
import { site } from "./content/site/en";
import { createMarkdownConverter } from "./convertMarkdown";
import { convertSeedToPayloadData, type SeedConverters } from "./convertSeedToPayloadData";
import { createAssetUploader } from "./uploadAssets";

if (process.env.CMS_SEED_ENABLED !== "true") {
  console.log("CMS seed is disabled, set CMS_SEED_ENABLED=true to run it");
  process.exit(0);
}

const payload = await getPayload({ config });
const context = { [SKIP_REVALIDATION]: true };
const locale = DEFAULT_LOCALE;
const converters: SeedConverters = {
  markdown: await createMarkdownConverter(payload.config),
  asset: createAssetUploader(payload, context),
};

await payload.updateGlobal({
  slug: "site",
  locale,
  context,
  data: await convertSeedToPayloadData(site, converters) as Site,
});

await payload.updateGlobal({
  slug: "homepage",
  locale,
  context,
  data: await convertSeedToPayloadData(homepage, converters) as Homepage,
});

payload.logger.info("CMS seed finished");
process.exit(0);
