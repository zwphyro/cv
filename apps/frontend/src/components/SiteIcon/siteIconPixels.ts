// Two block characters make one square pixel, the way a terminal draws them
const ART = `
      ████  ████
        ████  ████
      ████      ████
      ██  ██  ██  ██
      ██  ██  ██  ██
    ██████      ████
  ████████████████
      ██████████  ██
          ████  ████
        ████
`;

function parse(art: string) {
  const rows = art.split("\n").filter((row) => row.length > 0);
  const cells = rows.flatMap((row, y) =>
    Array.from({ length: Math.ceil(row.length / 2) }, (_, x) => ({ x, y })).filter(({ x }) => row.startsWith("██", x * 2)));

  const left = Math.min(...cells.map(({ x }) => x));
  const width = Math.max(...cells.map(({ x }) => x)) - left + 1;

  return {
    width,
    height: rows.length,
    cells: cells.map(({ x, y }) => ({ x: x - left, y })),
  };
}

export const SITE_ICON = parse(ART);
