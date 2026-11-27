import { type PointerEvent, type RefObject, useRef, useState } from "react";

import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { useIsVisible } from "@/hooks/useIsVisible";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MOBILE_QUERY } from "@/styles/breakpoints";

import { CELL_HEIGHT, CELL_WIDTH, DESKTOP_GRID, MOBILE_GRID, type TrailGrid } from "./dotGrid";

const TRAIL_CHARS = [".", ":", "+", "*"];
const FLICKER_CHANCE = 0.12;
const CELL_RATIO = CELL_HEIGHT / CELL_WIDTH;

interface Pointer {
  x: number;
  y: number;
}

function brighten(intensity: Float32Array, grid: TrailGrid, pointer: Pointer) {
  const rowRadius = Math.ceil(grid.radius / CELL_RATIO);
  for (let y = Math.floor(pointer.y - rowRadius); y <= pointer.y + rowRadius; y++) {
    for (let x = Math.floor(pointer.x - grid.radius); x <= pointer.x + grid.radius; x++) {
      if (x < 0 || y < 0 || x >= grid.columns || y >= grid.rows) continue;
      const distance = Math.hypot(x - pointer.x, (y - pointer.y) * CELL_RATIO);
      const index = y * grid.columns + x;
      intensity[index] = Math.max(intensity[index] ?? 0, 1 - distance / grid.radius);
    }
  }
}

function flicker(intensity: Float32Array) {
  if (Math.random() >= FLICKER_CHANCE) return;
  intensity[Math.floor(Math.random() * intensity.length)] = 0.75 + Math.random() * 0.25;
}

function decayAndRender(intensity: Float32Array, grid: TrailGrid) {
  let visible = false;
  const rows: string[] = [];

  for (let y = 0; y < grid.rows; y++) {
    let row = "";
    for (let x = 0; x < grid.columns; x++) {
      const index = y * grid.columns + x;
      const value = (intensity[index] ?? 0) * grid.decay;
      intensity[index] = value;
      const shown = value > 0.15 + Math.random() * 0.25;
      visible ||= shown;
      row += shown ? TRAIL_CHARS[Math.min(3, Math.floor(value * 4))] : " ";
    }
    rows.push(row);
  }
  return visible ? rows.join("\n") : "";
}

export function useDotTrail(areaRef: RefObject<HTMLElement | null>) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const grid = isMobile ? MOBILE_GRID : DESKTOP_GRID;
  const visible = useIsVisible(areaRef);

  const intensity = useRef(new Float32Array(0));
  const pointer = useRef<Pointer | null>(null);
  const [frame, setFrame] = useState("");
  const [active, setActive] = useState(false);

  const enabled = reducedMotion === false && isMobile !== null && visible && (active || grid.flicker);

  useAnimationFrame(() => {
    if (intensity.current.length !== grid.columns * grid.rows) {
      intensity.current = new Float32Array(grid.columns * grid.rows);
    }
    if (pointer.current) brighten(intensity.current, grid, pointer.current);
    if (grid.flicker) flicker(intensity.current);

    const next = decayAndRender(intensity.current, grid);
    setFrame(next);
    if (!next && !pointer.current) setActive(false);
  }, enabled);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: (event.clientX - rect.left) / CELL_WIDTH,
      y: (event.clientY - rect.top) / CELL_HEIGHT,
    };
    setActive(true);
  };

  const onPointerLeave = () => {
    pointer.current = null;
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") onPointerLeave();
  };

  return {
    frame: enabled ? frame : "",
    pointerHandlers: { onPointerMove, onPointerLeave, onPointerCancel: onPointerLeave, onPointerUp },
  };
}
