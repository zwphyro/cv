import { useState } from "react";

import { clamp01 } from "@/lib/math";

import { useScrollFrame } from "./useScrollFrame";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useScrollFrame(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0);
  });

  return progress;
}
