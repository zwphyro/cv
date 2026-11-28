import { RevealGroup } from "@/components/Reveal/RevealGroup";
import { FramedBox } from "@/components/ui/FramedBox/FramedBox";
import type { Homepage } from "@/payload-types";

import styles from "./SkillGroup.module.scss";
import { SkillRow } from "./SkillRow";

type Group = NonNullable<Homepage["skills"]["groups"]>[number];

interface SkillGroupProps {
  group: Group;
  oldestSince: number;
  strings: { since: string; also: string };
}

export function SkillGroup({ group, oldestSince, strings }: SkillGroupProps) {
  const also = group.also ?? [];

  return (
    <FramedBox
      title={group.title}
      className={styles.group}
    >
      <RevealGroup>
        <ul className={styles.rows}>
          {(group.items ?? []).map((skill) => (
            <SkillRow
              key={skill.id}
              skill={skill}
              oldestSince={oldestSince}
              sinceTemplate={strings.since}
            />
          ))}
        </ul>
      </RevealGroup>
      {also.length > 0 ? (
        <p className={styles.also}>
          <span className={styles.alsoLabel}>{`${strings.also} `}</span>
          {also.join(" · ")}
        </p>
      ) : null}
    </FramedBox>
  );
}
