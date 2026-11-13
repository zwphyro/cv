export function textBar(fraction: number, total: number) {
  const filled = Math.round(fraction * total);
  return "█".repeat(filled) + "░".repeat(total - filled);
}
