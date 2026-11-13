"use client";

import { useState } from "react";

import { useAnimationFrame } from "@/hooks/useAnimationFrame";

export function FrameStats() {
  const [running, setRunning] = useState(true);
  const [stats, setStats] = useState({ fps: 0, elapsed: 0 });

  useAnimationFrame(({ dt, elapsed }) => {
    setStats({ fps: Math.round(1 / dt), elapsed });
  }, running);

  return (
    <p>
      {`loop: ${String(stats.fps)} fps, ${stats.elapsed.toFixed(1)} s `}
      <button
        type="button"
        onClick={() => {
          setRunning(!running);
        }}
      >
        {running ? "Pause" : "Resume"}
      </button>
    </p>
  );
}
