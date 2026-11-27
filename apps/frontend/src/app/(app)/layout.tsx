import "@/styles/globals.scss";

import type { Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";

import { QueryProvider } from "@/components/QueryProvider/QueryProvider";
import { StringsProvider } from "@/components/StringsProvider/StringsProvider";
import { DEFAULT_LOCALE, getLocaleDescriptor } from "@/i18n/locales";
import { getStrings } from "@/i18n/strings";
import { THEME_CSS } from "@/theme/themeCss";
import { DEFAULT_THEME, THEMES } from "@/theme/themes";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: THEMES[DEFAULT_THEME].tokens.bg,
  colorScheme: THEMES[DEFAULT_THEME].colorScheme,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const locale = DEFAULT_LOCALE;

  return (
    <html
      lang={getLocaleDescriptor(locale).htmlLang}
      data-theme={DEFAULT_THEME}
      data-scroll-behavior="smooth"
      className={jetbrainsMono.variable}
    >
      <head>
        <style>{THEME_CSS}</style>
      </head>
      <body>
        <StringsProvider strings={getStrings(locale)}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </StringsProvider>
      </body>
    </html>
  );
}
