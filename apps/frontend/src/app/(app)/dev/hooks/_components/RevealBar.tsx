"use client";

import { useRef } from "react";

import { TextBar } from "@/components/ui/TextBar/TextBar";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

import styles from "./RevealBar.module.scss";

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
      <TextBar
        cells={progress * 14}
        total={14}
      />
      {` ${progress.toFixed(2)}`}
    </p>
  );
}
