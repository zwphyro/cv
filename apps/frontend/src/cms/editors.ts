import {
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";

import { MetricsBlock } from "./blocks/MetricsBlock";
import { StatBlock } from "./blocks/StatBlock";

const textFeatures = [
  ParagraphFeature(),
  BoldFeature(),
  UnorderedListFeature(),
  LinkFeature({ enabledCollections: [] }),
  FixedToolbarFeature(),
];

export const textEditor = lexicalEditor({
  features: () => textFeatures,
});

export const storyEditor = lexicalEditor({
  features: () => [
    ...textFeatures,
    BlocksFeature({ blocks: [StatBlock, MetricsBlock] }),
  ],
});
