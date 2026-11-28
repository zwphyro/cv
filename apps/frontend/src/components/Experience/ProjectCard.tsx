import { RichText } from "@/components/RichText/RichText";
import type { Job } from "@/lib/experience";

import styles from "./ProjectCard.module.scss";
import { StackLine } from "./StackLine";

type Project = NonNullable<Job["projects"]>[number];

interface ProjectCardProps {
  project: Project;
  period: string;
}

export function ProjectCard({ project, period }: ProjectCardProps) {
  const stack = project.stack ?? [];

  return (
    <section className={styles.project}>
      <header className={styles.header}>
        <h4 className={styles.title}>{project.title}</h4>
        <span className={styles.period}>{period}</span>
      </header>
      {project.body ? (
        <RichText
          data={project.body}
          className={styles.body}
        />
      ) : null}
      {stack.length > 0 ? <StackLine items={stack} /> : null}
    </section>
  );
}
