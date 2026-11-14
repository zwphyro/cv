import type { ComponentProps, ReactNode } from "react";

import { cx } from "@/lib/cx";

import { Field } from "./Field";
import styles from "./Field.module.scss";
import { useFieldIds } from "./useFieldIds";

type TextAreaProps = ComponentProps<"textarea"> & {
  label: ReactNode;
  error?: string;
};

export function TextArea({ label, error, id, className, rows = 5, ...props }: TextAreaProps) {
  const { controlId, errorId, controlProps } = useFieldIds(id, error);

  return (
    <Field
      label={label}
      controlId={controlId}
      error={error}
      errorId={errorId}
      className={className}
    >
      <textarea
        rows={rows}
        className={cx(styles.control, styles.multiline)}
        {...controlProps}
        {...props}
      />
    </Field>
  );
}
