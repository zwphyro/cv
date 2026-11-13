import { useEffect, useEffectEvent } from "react";

export function useScrollFrame(onFrame: () => void) {
  const handleFrame = useEffectEvent(onFrame);

  useEffect(() => {
    let requestId = 0;

    const run = () => {
      requestId = 0;
      handleFrame();
    };

    const schedule = () => {
      requestId ||= requestAnimationFrame(run);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(requestId);
    };
  }, []);
}
