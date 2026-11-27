// The single source of the site's themes:
// CSS variables, the browser's theme-color and generated images all read from here
export const THEMES = {
  dark: {
    colorScheme: "dark",
    tokens: {
      "bg": "#0e0f11",
      "bg-inset": "#14161a",
      "line": "#2b2f36",
      "line-soft": "#1e2126",
      "line-strong": "#3a3f47",
      "bar-empty": "#2f343b",
      "muted-2": "#5c626b",
      "muted": "#9ba1aa",
      "text-2": "#c9c6bf",
      "text": "#e8e6e1",
      "text-strong": "#f4f2ed",
      "accent": "#f2b84b",
      "on-accent": "#0e0f11",
      "link-hover": "#ffffff",
      "ok": "#6fcf7f",
      "error": "#f08a6c",
      "dots": "#2a2e35",
    },
  },
} as const satisfies Record<string, { colorScheme: "light" | "dark"; tokens: Record<string, string> }>;

export type Theme = keyof typeof THEMES;

export const DEFAULT_THEME: Theme = "dark";
