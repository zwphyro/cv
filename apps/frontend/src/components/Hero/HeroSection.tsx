"use client";

import { type ReactNode, useRef } from "react";

import { buildBaseGrid } from "./dotGrid";
import styles from "./HeroSection.module.scss";
import { useDotTrail } from "./useDotTrail";

const BASE_GRID = buildBaseGrid();

interface HeroSectionProps {
  titleId: string;
  children: ReactNode;
  below?: ReactNode;
}

export function HeroSection({ titleId, children, below }: HeroSectionProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const trail = useDotTrail(surfaceRef);

  return (
    <section
      aria-labelledby={titleId}
      className={styles.hero}
    >
      <div
        ref={surfaceRef}
        className={styles.surface}
        {...trail.pointerHandlers}
      >
        <pre
          aria-hidden="true"
          className={styles.dots}
        >
          {BASE_GRID}
        </pre>
        <pre
          aria-hidden="true"
          className={styles.trail}
        >
          {trail.frame}
        </pre>
        <div className={styles.content}>{children}</div>
      </div>
      {below}
    </section>
  );
}
