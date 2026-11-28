import { useState } from "react";

import { useScrollFrame } from "./useScrollFrame";

const ACTIVATION_LINE = 0.4;

export function useActiveSection<Id extends string>(ids: readonly Id[]) {
  const [activeId, setActiveId] = useState<Id | null>(null);

  useScrollFrame(() => {
    const activationTop = window.innerHeight * ACTIVATION_LINE;
    const reached = ids.filter((id) => {
      const section = document.getElementById(id);
      return section !== null && section.getBoundingClientRect().top < activationTop;
    });
    setActiveId(reached.at(-1) ?? null);
  });

  return activeId;
}
