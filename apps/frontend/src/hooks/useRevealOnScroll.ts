import { type RefObject, useState } from "react";

import { useAnimationFrame } from "./useAnimationFrame";
import { useEnteredViewport } from "./useEnteredViewport";

const REVEAL_LINE = 0.8;
const REVEAL_DURATION_S = 1.2;

export function useRevealOnScroll(ref: RefObject<Element | null>) {
  const entered = useEnteredViewport(ref, REVEAL_LINE);
  const [progress, setProgress] = useState(0);

  useAnimationFrame(({ elapsed }) => {
    setProgress(Math.min(1, elapsed / REVEAL_DURATION_S));
  }, entered && progress < 1);

  return progress;
}
