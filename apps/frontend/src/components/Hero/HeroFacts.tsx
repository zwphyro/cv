import { cx } from "@/lib/cx";
import type { Homepage } from "@/payload-types";

import styles from "./HeroFacts.module.scss";

type Fact = NonNullable<Homepage["hero"]["facts"]>[number];

interface HeroFactsProps {
  facts: Fact[];
}

export function HeroFacts({ facts }: HeroFactsProps) {
  return (
    <ul className={styles.facts}>
      {facts.map((fact) => (
        <li
          key={fact.id}
          className={styles.fact}
        >
          <span className={cx(styles.value, fact.highlighted && styles.highlighted)}>{fact.value}</span>
          <span className={styles.caption}>{fact.caption}</span>
        </li>
      ))}
    </ul>
  );
}
