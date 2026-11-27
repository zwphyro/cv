export const CELL_WIDTH = 8.4;
export const CELL_HEIGHT = 22;

const BASE_COLUMNS = 150;
const BASE_ROWS = 44;

export interface TrailGrid {
  columns: number;
  rows: number;
  radius: number;
  decay: number;
  flicker: boolean;
}

export const DESKTOP_GRID: TrailGrid = { columns: 150, rows: 30, radius: 10, decay: 0.86, flicker: false };
export const MOBILE_GRID: TrailGrid = { columns: 60, rows: 44, radius: 7, decay: 0.88, flicker: true };

export function buildBaseGrid() {
  return Array.from({ length: BASE_ROWS }, (_, y) =>
    Array.from({ length: BASE_COLUMNS }, (_, x) => (x % 3 === 0 && y % 2 === 0 ? "·" : " ")).join("")).join("\n");
}
