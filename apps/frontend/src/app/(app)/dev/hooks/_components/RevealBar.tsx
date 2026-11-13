"use client";

import { useRef } from "react";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

import styles from "./RevealBar.module.scss";
import { textBar } from "./textBar";

interface RevealBarProps {
  label: string;
}

export function RevealBar({ label }: RevealBarProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const progress = useRevealOnScroll(ref);

  return (
    <p
      ref={ref}
      className={styles.row}
    >
      {`${label} `}
      <span className={styles.bar}>{textBar(progress, 14)}</span>
      {` ${progress.toFixed(2)}`}
    </p>
  );
}
