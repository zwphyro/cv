"use client";

import { useRef } from "react";

import { useIsVisible } from "@/hooks/useIsVisible";
import { cx } from "@/lib/cx";

import styles from "./AsciiTorus.module.scss";
import { DESKTOP_TORUS, MOBILE_TORUS, renderTorus } from "./torus";
import { useTorusFrame } from "./useTorusFrame";

const VARIANTS = {
  desktop: DESKTOP_TORUS,
  mobile: MOBILE_TORUS,
};

const INITIAL_FRAMES = {
  desktop: renderTorus({ variant: DESKTOP_TORUS, time: 0, scrolled: 0 }),
  mobile: renderTorus({ variant: MOBILE_TORUS, time: 0, scrolled: 0 }),
};

interface AsciiTorusProps {
  variant: keyof typeof VARIANTS;
  className?: string;
}

export function AsciiTorus({ variant, className }: AsciiTorusProps) {
  const ref = useRef<HTMLPreElement>(null);
  const visible = useIsVisible(ref);
  const { frame, pointerHandlers } = useTorusFrame(VARIANTS[variant], INITIAL_FRAMES[variant], visible);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={cx(styles.torus, styles[variant], className)}
      {...(variant === "desktop" ? pointerHandlers : {})}
    >
      {frame}
    </pre>
  );
}
