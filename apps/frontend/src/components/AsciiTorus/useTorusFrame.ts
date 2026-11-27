import { type PointerEvent, useRef, useState } from "react";

import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollFrame } from "@/hooks/useScrollFrame";

import { type Cell, renderTorus, type TorusVariant } from "./torus";

export function useTorusFrame(variant: TorusVariant, initialFrame: string, visible: boolean) {
  const reducedMotion = usePrefersReducedMotion();
  const time = useRef(0);
  const pointer = useRef<Cell | null>(null);
  const [frame, setFrame] = useState(initialFrame);

  const draw = () => {
    setFrame(renderTorus({ variant, time: time.current, scrolled: window.scrollY, repelFrom: pointer.current }));
  };

  useAnimationFrame(({ dt }) => {
    time.current += dt;
    draw();
  }, visible && reducedMotion === false);

  useScrollFrame(() => {
    if (visible && reducedMotion === true) draw();
  });

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: (event.clientX - rect.left) / variant.cellWidth,
      y: (event.clientY - rect.top) / variant.cellHeight,
    };
    if (reducedMotion === true) draw();
  };

  const onPointerLeave = () => {
    pointer.current = null;
    if (reducedMotion === true) draw();
  };

  return { frame, pointerHandlers: { onPointerMove, onPointerLeave } };
}
