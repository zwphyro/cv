import { useId } from "react";

export function useFieldIds(id: string | undefined, error: string | undefined) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const errorId = `${controlId}-error`;

  return {
    controlId,
    errorId,
    controlProps: {
      id: controlId,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
    },
  };
}
