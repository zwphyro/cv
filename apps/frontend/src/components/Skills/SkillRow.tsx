import { fillTemplate } from "@/i18n/template";
import type { Homepage } from "@/payload-types";

import { SkillBar } from "./SkillBar";
import styles from "./SkillRow.module.scss";

type Skill = NonNullable<NonNullable<Homepage["skills"]["groups"]>[number]["items"]>[number];

interface SkillRowProps {
  skill: Skill;
  oldestSince: number;
  sinceTemplate: string;
}

export function SkillRow({ skill, oldestSince, sinceTemplate }: SkillRowProps) {
  return (
    <li className={styles.row}>
      <div className={styles.text}>
        <span className={styles.name}>{skill.name}</span>
        {skill.note ? <span className={styles.note}>{skill.note}</span> : null}
      </div>
      <div className={styles.meter}>
        <SkillBar
          since={skill.since}
          oldestSince={oldestSince}
          cells={14}
          className={styles.desktopBar}
        />
        <SkillBar
          since={skill.since}
          oldestSince={oldestSince}
          cells={16}
          className={styles.mobileBar}
        />
        <span className={styles.since}>{fillTemplate(sinceTemplate, { year: skill.since })}</span>
      </div>
    </li>
  );
}
