"use client";

import { createContext, type ReactNode, use, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const RevealContext = createContext(0);

interface RevealGroupProps {
  className?: string;
  children: ReactNode;
}

export function RevealGroup({ className, children }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRevealOnScroll(ref);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={className}
    >
      <RevealContext value={reducedMotion === true ? 1 : progress}>{children}</RevealContext>
    </div>
  );
}

export function useReveal() {
  return use(RevealContext);
}
