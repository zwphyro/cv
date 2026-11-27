import { cx } from "@/lib/cx";
import type { Homepage } from "@/payload-types";

import styles from "./Education.module.scss";

type Language = NonNullable<Homepage["education"]["languages"]>[number];

interface LanguagesProps {
  title: string;
  languages: Language[];
}

export function Languages({ title, languages }: LanguagesProps) {
  return (
    <div className={cx(styles.block, styles.languages)}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list}>
        {languages.map((language) => (
          <li
            key={language.id}
            className={styles.line}
          >
            {`${language.name} — ${language.level}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
