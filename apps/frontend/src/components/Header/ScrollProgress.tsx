"use client";

import { TextBar } from "@/components/ui/TextBar/TextBar";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cx } from "@/lib/cx";

import styles from "./ScrollProgress.module.scss";

const CELLS = { desktop: 12, mobile: 10 } as const;

interface ScrollProgressProps {
  variant: keyof typeof CELLS;
  className?: string;
}

function formatPercent(progress: number) {
  return `${String(Math.round(progress * 100)).padStart(3, " ")}%`;
}

export function ScrollProgress({ variant, className }: ScrollProgressProps) {
  const progress = useScrollProgress();
  const total = CELLS[variant];

  return (
    <span
      aria-hidden="true"
      className={cx(styles.progress, className)}
    >
      <TextBar
        cells={progress * total}
        total={total}
        track={variant === "desktop" ? "strong" : "default"}
        className={styles.bar}
      />
      {variant === "desktop" ? <span className={styles.percent}>{formatPercent(progress)}</span> : null}
    </span>
  );
}
