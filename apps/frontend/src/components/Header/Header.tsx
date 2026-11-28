import { MobileMenu } from "@/components/MobileMenu/MobileMenu";
import type { Contact } from "@/lib/contacts";
import type { NavSection } from "@/lib/sections";

import { Brand } from "./Brand";
import styles from "./Header.module.scss";
import { ScrollProgress } from "./ScrollProgress";
import { SectionNav } from "./SectionNav";

interface HeaderProps {
  name: string;
  sections: NavSection[];
  quickContacts: Contact[];
}

// Both layouts are rendered and switched in CSS, so the server sends the right one without a flash
export function Header({ name, sections, quickContacts }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.desktop}>
        <Brand name={name} />
        <SectionNav sections={sections} />
        <ScrollProgress
          variant="desktop"
          className={styles.progress}
        />
      </div>
      <div className={styles.mobile}>
        <MobileMenu
          name={name}
          sections={sections}
          quickContacts={quickContacts}
        />
      </div>
    </header>
  );
}
