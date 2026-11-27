import { Section } from "@/components/Section/Section";
import type { UiStrings } from "@/i18n/strings";
import type { Homepage } from "@/payload-types";

import { SkillGroup } from "./SkillGroup";
import styles from "./Skills.module.scss";

interface SkillsProps {
  skills: Homepage["skills"];
  strings: UiStrings["skills"];
}

export function Skills({ skills, strings }: SkillsProps) {
  const groups = skills.groups ?? [];
  const oldestSince = Math.min(...groups.flatMap((group) => (group.items ?? []).map((skill) => skill.since)));

  return (
    <Section
      id="skills"
      title={skills.title}
      headingClassName={styles.heading}
    >
      <p className={styles.intro}>{skills.intro}</p>
      <div className={styles.groups}>
        {groups.map((group) => (
          <SkillGroup
            key={group.id}
            group={group}
            oldestSince={oldestSince}
            strings={strings}
          />
        ))}
      </div>
    </Section>
  );
}
