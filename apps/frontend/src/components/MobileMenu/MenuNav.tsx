"use client";

import { useStrings } from "@/components/StringsProvider/StringsProvider";
import { Arrow } from "@/components/ui/Arrow/Arrow";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cx } from "@/lib/cx";
import { type NavSection, SECTION_IDS } from "@/lib/sections";

import styles from "./MenuNav.module.scss";

interface MenuNavProps {
  sections: NavSection[];
  onNavigate: () => void;
}

export function MenuNav({ sections, onNavigate }: MenuNavProps) {
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
          onClick={onNavigate}
        >
          <span>{label}</span>
          <Arrow
            aria-hidden="true"
            className={styles.arrow}
          />
        </a>
      ))}
    </nav>
  );
}
