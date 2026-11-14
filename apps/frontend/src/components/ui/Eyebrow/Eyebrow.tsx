import type { ComponentProps } from "react";

import { cx } from "@/lib/cx";

import styles from "./Eyebrow.module.scss";

export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cx(styles.eyebrow, className)}
      {...props}
    />
  );
}
