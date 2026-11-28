import { cx } from "@/lib/cx";

import styles from "./BlockCursor.module.scss";

interface BlockCursorProps {
  blinking?: boolean;
  className?: string;
}

export function BlockCursor({ blinking = false, className }: BlockCursorProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(styles.cursor, blinking && styles.blinking, className)}
    />
  );
}
