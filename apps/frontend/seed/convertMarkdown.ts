import { convertMarkdownToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import type { SanitizedConfig } from "payload";

import { storyEditor } from "@/cms/editors";

import type { Markdown } from "./markdown";

const BLOCK_TAG = /^<(Stat|Metrics)\b/gm;

type LexicalState = ReturnType<typeof convertMarkdownToLexical>;

function assertBlocksConverted(source: Markdown, state: LexicalState) {
  const expected = source.text.match(BLOCK_TAG)?.length ?? 0;
  const converted = state.root.children.filter((node) => node.type === "block").length;
  if (converted !== expected) {
    throw new Error(`${source.file}: ${String(expected)} block tags, but ${String(converted)} were converted`);
  }
}

export async function createMarkdownConverter(config: SanitizedConfig) {
  const editorConfig = await editorConfigFactory.fromEditor({ config, editor: storyEditor });

  return (source: Markdown) => {
    const state = convertMarkdownToLexical({ editorConfig, markdown: source.text });
    assertBlocksConverted(source, state);
    return state;
  };
}
