"use client";

import { useStrings } from "@/components/StringsProvider/StringsProvider";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cx } from "@/lib/cx";
import { type NavSection, SECTION_IDS } from "@/lib/sections";

import styles from "./SectionNav.module.scss";

interface SectionNavProps {
  sections: NavSection[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const { header } = useStrings();
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label={header.sectionsLabel}
      className={styles.nav}
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={id === activeId ? "true" : undefined}
          className={cx(styles.item, id === activeId && styles.active)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
