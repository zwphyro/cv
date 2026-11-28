import type { ComponentProps } from "react";

import { buttonClassName, type ButtonStyleProps } from "./buttonClassName";

type ButtonLinkProps = ComponentProps<"a"> & ButtonStyleProps;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return (
    <a
      className={buttonClassName({ variant, size }, className)}
      {...props}
    />
  );
}
