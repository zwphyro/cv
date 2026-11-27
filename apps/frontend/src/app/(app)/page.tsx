import { connection } from "next/server";

import { AsciiTorus } from "@/components/AsciiTorus/AsciiTorus";
import { Contact } from "@/components/Contact/Contact";
import { Education } from "@/components/Education/Education";
import { Experience } from "@/components/Experience/Experience";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Skills } from "@/components/Skills/Skills";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getStrings } from "@/i18n/strings";
import { getHomepage } from "@/lib/cms/getHomepage";
import { getSite } from "@/lib/cms/getSite";
import { getQuickContacts } from "@/lib/contacts";
import { getCvFile } from "@/lib/cvFile";
import { env } from "@/lib/env";
import { getNavSections } from "@/lib/sections";

import styles from "./page.module.scss";

export default async function Home() {
  await connection();

  const locale = DEFAULT_LOCALE;
  const [site, homepage] = await Promise.all([getSite(locale), getHomepage(locale)]);
  const contacts = site.contacts ?? [];
  const strings = getStrings(locale);

  return (
    <>
      <Header
        name={site.name}
        sections={getNavSections(homepage)}
        quickContacts={getQuickContacts(contacts)}
      />
      <div className={styles.layout}>
        <main className={styles.main}>
          <Hero
            hero={homepage.hero}
            name={site.name}
            cv={getCvFile(site)}
            strings={strings.hero}
          />
          <Skills
            skills={homepage.skills}
            strings={strings.skills}
          />
          <Experience
            experience={homepage.experience}
            locale={locale}
            presentLabel={strings.experience.present}
          />
          <Education
            education={homepage.education}
            locale={locale}
            presentLabel={strings.experience.present}
          />
          <Contact
            contact={homepage.contact}
            turnstileSiteKey={env.TURNSTILE_SITE_KEY}
          />
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
