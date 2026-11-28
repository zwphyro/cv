import type { ComponentProps } from "react";

import { buttonClassName, type ButtonStyleProps } from "./buttonClassName";

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size }, className)}
      {...props}
    />
  );
}
