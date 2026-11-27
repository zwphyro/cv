import { readFile } from "node:fs/promises";

import { ImageResponse } from "next/og";
import { connection } from "next/server";

import { SiteIcon } from "@/components/SiteIcon/SiteIcon";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getHomepage } from "@/lib/cms/getHomepage";
import { getSite } from "@/lib/cms/getSite";
import { DEFAULT_THEME, THEMES } from "@/theme/themes";

export const alt = "CV website preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = THEMES[DEFAULT_THEME].tokens;

function loadFonts() {
  return Promise.all([
    readFile(new URL("./_fonts/JetBrainsMono/JetBrainsMono-Regular.woff", import.meta.url)),
    readFile(new URL("./_fonts/JetBrainsMono/JetBrainsMono-Bold.woff", import.meta.url)),
  ]);
}

function OgTitle({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: "0.6em", color: colors["text-strong"], fontSize: 76, fontWeight: 700 }}>
      {words.map((word, index) => (
        <div
          key={`${String(index)}:${word}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          {word}
          {index === words.length - 1 ? (
            <div style={{ width: 38, height: 62, marginLeft: 6, background: colors.accent }} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default async function OpenGraphImage() {
  await connection();
  const [site, homepage, [regular, bold]] = await Promise.all([
    getSite(DEFAULT_LOCALE),
    getHomepage(DEFAULT_LOCALE),
    loadFonts(),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 80,
        background: colors.bg,
        color: colors.text,
        fontFamily: "JetBrains Mono",
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <OgTitle title={homepage.hero.title} />
          <div style={{ fontSize: 40 }}>{site.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: 28,
            borderTop: `2px solid ${colors.line}`,
            color: colors["text-2"],
            fontSize: 26,
            lineHeight: 1.5,
          }}
        >
          {site.seo.description}
        </div>
      </div>
      <SiteIcon
        size={240}
        cell={22}
        background="transparent"
      />
    </div>,
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
