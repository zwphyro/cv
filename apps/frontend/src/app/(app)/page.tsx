import { connection } from "next/server";

import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/Section/Section";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getHomepage } from "@/lib/cms/getHomepage";
import { getSite } from "@/lib/cms/getSite";
import { getQuickContacts } from "@/lib/contacts";
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
          {SECTION_IDS.map((id) => (
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
        />
      </div>
      <Footer
        name={site.name}
        contacts={contacts}
        locale={locale}
      />
    </>
  );
}
