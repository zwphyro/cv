import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./SectionHeading.module.scss";

interface SectionHeadingProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ id, children, className }: SectionHeadingProps) {
  return (
    <div className={cx(styles.heading, className)}>
      <h2
        id={id}
        className={styles.title}
      >
        {children}
      </h2>
      <span
        aria-hidden="true"
        className={styles.rule}
      />
    </div>
  );
}
