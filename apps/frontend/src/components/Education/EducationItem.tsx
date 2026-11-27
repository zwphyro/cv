import { RichText } from "@/components/RichText/RichText";
import type { Locale } from "@/i18n/locales";
import { formatPeriod } from "@/lib/formatPeriod";
import type { Homepage } from "@/payload-types";

import styles from "./Education.module.scss";

type Item = NonNullable<Homepage["education"]["items"]>[number];

interface EducationItemProps {
  item: Item;
  locale: Locale;
  presentLabel: string;
}

export function EducationItem({ item, locale, presentLabel }: EducationItemProps) {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>{item.degree}</h3>
      <p className={styles.line}>{item.institution}</p>
      <p className={styles.period}>{formatPeriod(item, locale, presentLabel)}</p>
      {item.details ? (
        <RichText
          data={item.details}
          className={styles.details}
        />
      ) : null}
    </div>
  );
}
