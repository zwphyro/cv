import { cx } from "@/lib/cx";

import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "lg" | "md" | "sm";

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function buttonClassName({ variant = "primary", size = "lg" }: ButtonStyleProps, className?: string) {
  return cx(styles.button, styles[variant], styles[size], className);
}
