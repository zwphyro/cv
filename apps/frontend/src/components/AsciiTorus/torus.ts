const COLUMNS = 52;
const ROWS = 30;
const SHADES = ".,-~:;=!*#$@";

const MAJOR_RADIUS = 1;
const MINOR_RADIUS = 0.45;
const VIEWER_DISTANCE = 4;
const SCALE = 60;

const REPEL_RADIUS = 9;
const REPEL_SHIFT = 5;

export interface TorusVariant {
  cellWidth: number;
  cellHeight: number;
  scrollSpeedA: number;
  scrollSpeedB: number;
}

export const DESKTOP_TORUS: TorusVariant = {
  cellWidth: 7.2,
  cellHeight: 13.2,
  scrollSpeedA: 0.0016,
  scrollSpeedB: 0.0032,
};

export const MOBILE_TORUS: TorusVariant = {
  cellWidth: 6,
  cellHeight: 11,
  scrollSpeedA: 0.0024,
  scrollSpeedB: 0.0048,
};

export interface Cell {
  x: number;
  y: number;
}

interface TorusFrame {
  variant: TorusVariant;
  time: number;
  scrolled: number;
  repelFrom?: Cell | null;
}

// Each point is stored as six numbers: position x, y, z and normal x, y, z
function buildPointCloud() {
  const values: number[] = [];
  for (let theta = 0; theta < 6.283; theta += 0.07) {
    for (let phi = 0; phi < 6.283; phi += 0.022) {
      const ring = MAJOR_RADIUS + MINOR_RADIUS * Math.cos(theta);
      values.push(
        ring * Math.cos(phi), MINOR_RADIUS * Math.sin(theta), ring * Math.sin(phi),
        Math.cos(theta) * Math.cos(phi), Math.sin(theta), Math.cos(theta) * Math.sin(phi),
      );
    }
  }
  return Float32Array.from(values);
}

const POINTS = buildPointCloud();

// Pushes a projected point away from the pointer, correcting for the cell being taller than wide
function repel(x: number, y: number, from: Cell, variant: TorusVariant) {
  const aspect = variant.cellHeight / variant.cellWidth;
  const dx = x - from.x;
  const dy = (y - from.y) * aspect;
  const distance = Math.hypot(dx, dy);
  if (distance <= 0.001 || distance >= REPEL_RADIUS) return { x, y };

  const push = ((REPEL_RADIUS - distance) / REPEL_RADIUS) * REPEL_SHIFT;
  return { x: x + (dx / distance) * push, y: y + (dy / distance) * push / aspect };
}

export function renderTorus({ variant, time, scrolled, repelFrom }: TorusFrame) {
  const a = 0.5 + time * 0.35 + scrolled * variant.scrollSpeedA;
  const b = time * 0.5 + scrolled * variant.scrollSpeedB;
  const [cosA, sinA, cosB, sinB] = [Math.cos(a), Math.sin(a), Math.cos(b), Math.sin(b)];
  const scaleY = SCALE * (variant.cellWidth / variant.cellHeight);

  const depth = new Float32Array(COLUMNS * ROWS);
  const chars: string[] = new Array<string>(COLUMNS * ROWS).fill(" ");

  for (let i = 0; i < POINTS.length; i += 6) {
    const x = POINTS[i] ?? 0;
    const y = POINTS[i + 1] ?? 0;
    const z = POINTS[i + 2] ?? 0;
    const nx = POINTS[i + 3] ?? 0;
    const ny = POINTS[i + 4] ?? 0;
    const nz = POINTS[i + 5] ?? 0;

    const y1 = y * cosA - z * sinA;
    const z1 = y * sinA + z * cosA;
    const x2 = x * cosB + z1 * sinB;
    const z2 = -x * sinB + z1 * cosB;

    const ny1 = ny * cosA - nz * sinA;
    const nz1 = ny * sinA + nz * cosA;
    const nx2 = nx * cosB + nz1 * sinB;
    const nz2 = -nx * sinB + nz1 * cosB;

    const inverseDepth = 1 / (z2 + VIEWER_DISTANCE);
    let projected = { x: COLUMNS / 2 + SCALE * inverseDepth * x2, y: ROWS / 2 - scaleY * inverseDepth * y1 };
    if (repelFrom && Math.abs(projected.x - repelFrom.x) < REPEL_RADIUS) {
      projected = repel(projected.x, projected.y, repelFrom, variant);
    }

    const column = Math.floor(projected.x);
    const row = Math.floor(projected.y);
    if (column < 0 || row < 0 || column >= COLUMNS || row >= ROWS) continue;

    const index = row * COLUMNS + column;
    if (inverseDepth <= (depth[index] ?? 0)) continue;
    depth[index] = inverseDepth;

    const light = nx2 * 0.32 + ny1 * 0.6 - nz2 * 0.73;
    chars[index] = light > 0 ? (SHADES[Math.min(11, Math.floor(light * 12))] ?? ".") : ".";
  }

  const rows: string[] = [];
  for (let row = 0; row < ROWS; row++) rows.push(chars.slice(row * COLUMNS, (row + 1) * COLUMNS).join(""));
  return rows.join("\n");
}
