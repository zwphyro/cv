import { type RefObject, useEffect, useState } from "react";

export function useEnteredViewport(ref: RefObject<Element | null>, line: number) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || entered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lineTop = window.innerHeight * line;
        if (entries.some((entry) => entry.boundingClientRect.top < lineTop)) setEntered(true);
      },
      { rootMargin: `0px 0px ${String(-(1 - line) * 100)}% 0px` },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, line, entered]);

  return entered;
}
