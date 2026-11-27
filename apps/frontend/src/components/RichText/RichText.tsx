import type { DefaultNodeTypes, SerializedBlockNode } from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { type JSXConvertersFunction, RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";

import { MetricsPanel } from "@/components/Experience/MetricsPanel";
import { StatCard } from "@/components/Experience/StatCard";
import { PlaceholderText } from "@/components/PlaceholderText/PlaceholderText";
import { cx } from "@/lib/cx";
import type { MetricsBlock, StatBlock } from "@/payload-types";

import styles from "./RichText.module.scss";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<StatBlock> | SerializedBlockNode<MetricsBlock>;

const BOLD_FORMAT = 1;
const EXTERNAL_URL = /^https?:\/\//;

const converters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => <p className={styles.paragraph}>{nodesToJSX({ nodes: node.children })}</p>,
  list: ({ node, nodesToJSX }) => <ul className={styles.list}>{nodesToJSX({ nodes: node.children })}</ul>,
  text: ({ node }) => {
    const text = <PlaceholderText text={node.text} />;
    return node.format & BOLD_FORMAT ? <strong className={styles.strong}>{text}</strong> : text;
  },
  link: ({ node, nodesToJSX }) => {
    const href = node.fields.url ?? "";
    const external = EXTERNAL_URL.test(href);
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </a>
    );
  },
  blocks: {
    stat: ({ node }) => (
      <StatCard
        value={node.fields.value}
        caption={node.fields.caption}
      />
    ),
    metrics: ({ node }) => (
      <MetricsPanel
        label={node.fields.label}
        items={node.fields.items}
      />
    ),
  },
});

interface RichTextProps {
  data: SerializedEditorState;
  className?: string;
}

export function RichText({ data, className }: RichTextProps) {
  return (
    <LexicalRichText
      data={data}
      converters={converters}
      className={cx(styles.richText, className)}
    />
  );
}
