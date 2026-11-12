import "@/styles/globals.scss";

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { DEFAULT_THEME } from "@/theme/themes";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maxim Starodubov | Full-Stack Engineer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      data-scroll-behavior="smooth"
      className={jetbrainsMono.variable}
    >
      <body>{children}</body>
    </html>
  );
}
