"use client";

import { useState } from "react";

import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cx } from "@/lib/cx";

import styles from "./Spinner.module.scss";

const FRAMES = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";
const FRAME_DURATION_S = 0.08;

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [frame, setFrame] = useState(0);

  useAnimationFrame(({ elapsed }) => {
    setFrame(Math.floor(elapsed / FRAME_DURATION_S) % FRAMES.length);
  }, !reducedMotion);

  return (
    <span
      aria-hidden="true"
      className={cx(styles.spinner, className)}
    >
      {FRAMES[frame]}
    </span>
  );
}
