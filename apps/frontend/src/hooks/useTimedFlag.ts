import { useEffect, useState } from "react";

export function useTimedFlag(durationMs: number) {
  const [raisedAt, setRaisedAt] = useState<number | null>(null);

  useEffect(() => {
    if (raisedAt === null) return;

    const timeoutId = setTimeout(() => {
      setRaisedAt(null);
    }, durationMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [raisedAt, durationMs]);

  const raise = () => {
    setRaisedAt(performance.now());
  };

  return [raisedAt !== null, raise] as const;
}
