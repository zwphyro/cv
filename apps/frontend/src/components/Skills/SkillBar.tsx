"use client";

import { useReveal } from "@/components/Reveal/RevealGroup";
import { TextBar } from "@/components/ui/TextBar/TextBar";
import { useFractionalYear } from "@/hooks/useFractionalYear";

interface SkillBarProps {
  since: number;
  oldestSince: number;
  cells: number;
  className?: string;
}

export function SkillBar({ since, oldestSince, cells, className }: SkillBarProps) {
  const reveal = useReveal();
  const now = useFractionalYear();
  const share = now === null ? 0 : (now - since) / Math.max(now - oldestSince, 1);

  return (
    <TextBar
      cells={share * cells * reveal}
      total={cells}
      className={className}
    />
  );
}
