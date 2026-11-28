import { DEFAULT_THEME, THEMES } from "@/theme/themes";

import { SITE_ICON } from "./siteIconPixels";

interface SiteIconProps {
  size: number;
  cell: number;
  background?: string;
}

export function SiteIcon({ size, cell, background = THEMES[DEFAULT_THEME].tokens.bg }: SiteIconProps) {
  const { width, height, cells } = SITE_ICON;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: size, height: size, background }}>
      <svg
        width={width * cell}
        height={height * cell}
        viewBox={`0 0 ${String(width)} ${String(height)}`}
        shapeRendering="crispEdges"
      >
        {cells.map(({ x, y }) => (
          <rect
            key={`${String(x)}:${String(y)}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={THEMES[DEFAULT_THEME].tokens.accent}
          />
        ))}
      </svg>
    </div>
  );
}
