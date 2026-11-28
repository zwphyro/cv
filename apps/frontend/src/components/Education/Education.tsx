import { Section } from "@/components/Section/Section";
import type { Locale } from "@/i18n/locales";
import type { Homepage } from "@/payload-types";

import styles from "./Education.module.scss";
import { EducationItem } from "./EducationItem";
import { Languages } from "./Languages";

interface EducationProps {
  education: Homepage["education"];
  locale: Locale;
  presentLabel: string;
}

export function Education({ education, locale, presentLabel }: EducationProps) {
  const languages = education.languages ?? [];

  return (
    <Section
      id="education"
      title={education.title}
      headingClassName={styles.heading}
    >
      <div className={styles.grid}>
        {(education.items ?? []).map((item) => (
          <EducationItem
            key={item.id}
            item={item}
            locale={locale}
            presentLabel={presentLabel}
          />
        ))}
        {languages.length > 0 ? (
          <Languages
            title={education.languagesTitle}
            languages={languages}
          />
        ) : null}
      </div>
    </Section>
  );
}
