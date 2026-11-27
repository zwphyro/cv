import { useSyncExternalStore } from "react";

function subscribe() {
  return () => undefined;
}

function getSnapshot() {
  const now = new Date();
  return now.getFullYear() + now.getMonth() / 12;
}

function getServerSnapshot() {
  return null;
}

// "2026.83" for November 2026; null on the server, where the visitor's clock is unknown
export function useFractionalYear() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
