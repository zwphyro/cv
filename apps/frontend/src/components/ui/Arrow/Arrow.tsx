import type { ComponentProps } from "react";

import { cx } from "@/lib/cx";

import styles from "./Arrow.module.scss";

export function Arrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cx(styles.arrow, className)}
      {...props}
    >
      {"->"}
    </span>
  );
}
