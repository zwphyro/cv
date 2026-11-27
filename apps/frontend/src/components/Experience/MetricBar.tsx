"use client";

import { useReveal } from "@/components/Reveal/RevealGroup";
import { TextBar } from "@/components/ui/TextBar/TextBar";
import { clamp01 } from "@/lib/math";

const CELLS = 20;

interface MetricBarProps {
  value: number;
  min: number;
  max: number;
  className?: string;
}

export function MetricBar({ value, min, max, className }: MetricBarProps) {
  const reveal = useReveal();
  const share = max > min ? clamp01((value - min) / (max - min)) : 1;

  return (
    <TextBar
      cells={share * CELLS * reveal}
      total={CELLS}
      className={className}
    />
  );
}
