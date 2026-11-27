import { connection } from "next/server";

import { AsciiTorus } from "@/components/AsciiTorus/AsciiTorus";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Section } from "@/components/Section/Section";
import { Skills } from "@/components/Skills/Skills";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getStrings } from "@/i18n/strings";
import { getHomepage } from "@/lib/cms/getHomepage";
import { getSite } from "@/lib/cms/getSite";
import { getQuickContacts } from "@/lib/contacts";
import { getCvFile } from "@/lib/cvFile";
import { getNavSections, SECTION_IDS } from "@/lib/sections";

import styles from "./page.module.scss";

export default async function Home() {
  await connection();

  const locale = DEFAULT_LOCALE;
  const [site, homepage] = await Promise.all([getSite(locale), getHomepage(locale)]);
  const contacts = site.contacts ?? [];

  return (
    <>
      <Header
        name={site.name}
        sections={getNavSections(homepage)}
        quickContacts={getQuickContacts(contacts)}
      />
      <div
        id="top"
        className={styles.layout}
      >
        <main className={styles.main}>
          <Hero
            hero={homepage.hero}
            name={site.name}
            cv={getCvFile(site)}
            strings={getStrings(locale).hero}
          />
          <Skills
            skills={homepage.skills}
            strings={getStrings(locale).skills}
          />
          {SECTION_IDS.filter((id) => id !== "skills").map((id) => (
            <Section
              key={id}
              id={id}
              title={homepage[id].title}
            />
          ))}
        </main>
        <aside
          aria-hidden="true"
          className={styles.aside}
        >
          <div className={styles.asideInner}>
            <AsciiTorus variant="desktop" />
          </div>
        </aside>
      </div>
      <Footer
        name={site.name}
        contacts={contacts}
        locale={locale}
      />
    </>
  );
}
