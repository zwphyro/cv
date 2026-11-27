import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./Field.module.scss";

interface FieldProps {
  label: ReactNode;
  controlId: string;
  error?: string;
  errorId: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, controlId, error, errorId, className, children }: FieldProps) {
  return (
    <div className={cx(styles.field, className)}>
      <div className={styles.header}>
        <label
          htmlFor={controlId}
          className={styles.label}
        >
          {label}
        </label>
        {error ? (
          <p
            id={errorId}
            className={styles.error}
          >
            {error}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
