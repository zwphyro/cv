import type { Locale } from "@/i18n/locales";
import { getStrings } from "@/i18n/strings";
import { fillTemplate } from "@/i18n/template";
import type { Contact } from "@/lib/contacts";

import { ContactList } from "./ContactList";
import styles from "./Footer.module.scss";

interface FooterProps {
  name: string;
  contacts: Contact[];
  locale: Locale;
}

export function Footer({ name, contacts, locale }: FooterProps) {
  const { footer } = getStrings(locale);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{footer.title}</h2>
        <ContactList contacts={contacts} />
        <p className={styles.copyright}>{fillTemplate(footer.copyright, { year, name })}</p>
      </div>
    </footer>
  );
}
