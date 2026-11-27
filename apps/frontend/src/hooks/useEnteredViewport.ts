import { type RefObject, useEffect, useState } from "react";

// Counts as entered once the top crosses the line, including when the page was already scrolled past it
function hasEntered(entry: IntersectionObserverEntry) {
  return entry.isIntersecting || entry.boundingClientRect.bottom <= 0;
}

export function useEnteredViewport(ref: RefObject<Element | null>, line: number) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || entered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(hasEntered)) setEntered(true);
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
