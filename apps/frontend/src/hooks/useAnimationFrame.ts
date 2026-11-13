import { useEffect, useEffectEvent } from "react";

const FRAME_INTERVAL_MS = 33;
const MAX_FRAME_DELTA_S = 0.1;

export interface AnimationFrame {
  dt: number;
  elapsed: number;
}

export function useAnimationFrame(onFrame: (frame: AnimationFrame) => void, enabled = true) {
  const handleFrame = useEffectEvent(onFrame);

  useEffect(() => {
    if (!enabled) return;

    let previous = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      requestId = requestAnimationFrame(tick);
      if (now - previous < FRAME_INTERVAL_MS) return;

      const dt = Math.min(MAX_FRAME_DELTA_S, (now - previous) / 1000);
      previous = now;
      elapsed += dt;
      handleFrame({ dt, elapsed });
    };

    let requestId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [enabled]);
}
