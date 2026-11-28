"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./Timeline.module.scss";
import { MARKER_ATTRIBUTE, useTimelineProgress } from "./useTimelineProgress";

export interface TimelineItem {
  id: string;
  content: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { fill, litCount } = useTimelineProgress(ref);

  return (
    <div
      ref={ref}
      className={styles.timeline}
      style={{ "--fill": fill } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className={styles.track}
      />
      <span
        aria-hidden="true"
        className={styles.fill}
      />
      <ol className={styles.items}>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={styles.item}
          >
            <span
              aria-hidden="true"
              className={cx(styles.marker, index < litCount && styles.lit)}
              {...{ [MARKER_ATTRIBUTE]: "" }}
            />
            {item.content}
          </li>
        ))}
      </ol>
    </div>
  );
}
