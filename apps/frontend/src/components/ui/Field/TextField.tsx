import type { ComponentProps, ReactNode } from "react";

import { Field } from "./Field";
import styles from "./Field.module.scss";
import { useFieldIds } from "./useFieldIds";

type TextFieldProps = ComponentProps<"input"> & {
  label: ReactNode;
  error?: string;
};

export function TextField({ label, error, id, className, ...props }: TextFieldProps) {
  const { controlId, errorId, controlProps } = useFieldIds(id, error);

  return (
    <Field
      label={label}
      controlId={controlId}
      error={error}
      errorId={errorId}
      className={className}
    >
      <input
        className={styles.control}
        {...controlProps}
        {...props}
      />
    </Field>
  );
}
