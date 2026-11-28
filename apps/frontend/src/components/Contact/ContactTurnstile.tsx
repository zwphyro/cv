"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import type { Ref } from "react";

interface ContactTurnstileProps {
  siteKey: string;
  ref: Ref<TurnstileInstance | null>;
  onWidgetLoad: () => void;
}

export function ContactTurnstile({ siteKey, ref, onWidgetLoad }: ContactTurnstileProps) {
  return (
    <Turnstile
      ref={ref}
      siteKey={siteKey}
      options={{ appearance: "interaction-only", execution: "execute", theme: "dark" }}
      onWidgetLoad={onWidgetLoad}
    />
  );
}
