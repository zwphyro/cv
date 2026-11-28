import { type RefObject, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { clamp01 } from "@/lib/math";

export const MARKER_ATTRIBUTE = "data-timeline-marker";

const LINE_OFFSET = 10;
const GROWTH_LINE = 0.6;

export function useTimelineProgress(timelineRef: RefObject<HTMLElement | null>) {
  const reducedMotion = usePrefersReducedMotion();
  const [fill, setFill] = useState(0);
  const [litCount, setLitCount] = useState(0);

  useScrollFrame(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const rect = timeline.getBoundingClientRect();
    const lineLength = rect.height - LINE_OFFSET;
    const grown = clamp01((window.innerHeight * GROWTH_LINE - rect.top) / rect.height) * rect.height;
    const visibleLength = Math.min(grown, lineLength);
    const lineEnd = rect.top + LINE_OFFSET + visibleLength;

    const markers = [...timeline.querySelectorAll(`[${MARKER_ATTRIBUTE}]`)];
    setFill(lineLength > 0 ? visibleLength / lineLength : 0);
    setLitCount(markers.filter((marker) => {
      const markerRect = marker.getBoundingClientRect();
      return lineEnd >= markerRect.top + markerRect.height / 2;
    }).length);
  });

  return reducedMotion === true ? { fill: 1, litCount: Infinity } : { fill, litCount };
}
