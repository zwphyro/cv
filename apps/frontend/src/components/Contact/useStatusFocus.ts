import { useEffect, useRef } from "react";
import { flushSync } from "react-dom";

import type { ContactPhase } from "./useContactForm";

export function useStatusFocus(phase: ContactPhase, startOver: () => void) {
  const sentTitleRef = useRef<HTMLParagraphElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === "sent") sentTitleRef.current?.focus();
  }, [phase]);

  const restart = () => {
    flushSync(startOver);
    firstFieldRef.current?.focus();
  };

  return { sentTitleRef, firstFieldRef, restart };
}
