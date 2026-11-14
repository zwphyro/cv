import { cx } from "@/lib/cx";

import styles from "./TextBar.module.scss";

interface TextBarProps {
  cells: number;
  total: number;
  track?: "default" | "strong";
  className?: string;
}

export function TextBar({ cells, total, track = "default", className }: TextBarProps) {
  const filled = Math.min(total, Math.max(0, Math.round(cells)));

  return (
    <span
      aria-hidden="true"
      className={cx(styles.bar, styles[track], className)}
    >
      <span className={styles.fill}>{"█".repeat(filled)}</span>
      <span className={styles.empty}>{"░".repeat(total - filled)}</span>
    </span>
  );
}
