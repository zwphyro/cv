import { useSyncExternalStore } from "react";

function getServerSnapshot() {
  return null;
}

export function useMediaQuery(query: string): boolean | null {
  const subscribe = (onChange: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", onChange);
    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
