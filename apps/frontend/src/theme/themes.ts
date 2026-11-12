// Keep in sync with $themes in src/styles/_themes.scss
export const THEMES = ["dark"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "dark";
