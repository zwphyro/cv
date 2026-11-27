import { type RefObject, useEffect, useState } from "react";

export function useIsVisible(ref: RefObject<Element | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      setVisible(entries.some((entry) => entry.isIntersecting));
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return visible;
}
