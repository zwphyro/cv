import { cx } from "@/lib/cx";

import styles from "./StatusDot.module.scss";

interface StatusDotProps {
  className?: string;
}

export function StatusDot({ className }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(styles.dot, className)}
    />
  );
}
