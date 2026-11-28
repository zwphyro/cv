import { DEFAULT_THEME, type Theme, THEMES } from "./themes";

function declarations(theme: Theme) {
  const { colorScheme, tokens } = THEMES[theme];
  const variables = Object.entries(tokens).map(([name, value]) => `--${name}: ${value};`);
  return [`color-scheme: ${colorScheme};`, ...variables].join(" ");
}

export const THEME_CSS = [
  `:root { ${declarations(DEFAULT_THEME)} }`,
  ...(Object.keys(THEMES) as Theme[]).map((theme) => `[data-theme="${theme}"] { ${declarations(theme)} }`),
].join("\n");
