import { RichText } from "@/components/RichText/RichText";
import type { Locale } from "@/i18n/locales";
import type { Job } from "@/lib/experience";
import { formatPeriod } from "@/lib/formatPeriod";

import styles from "./JobCard.module.scss";
import { ProjectCard } from "./ProjectCard";
import { StackLine } from "./StackLine";

interface JobCardProps {
  job: Job;
  locale: Locale;
  presentLabel: string;
}

export function JobCard({ job, locale, presentLabel }: JobCardProps) {
  const period = formatPeriod(job, locale, presentLabel);
  const stack = job.stack ?? [];

  return (
    <article className={styles.job}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.position}>{job.position}</h3>
          <p className={styles.company}>{job.company}</p>
        </div>
        <p className={styles.meta}>{job.location ? `${period} · ${job.location}` : period}</p>
      </header>
      {job.body ? (
        <RichText
          data={job.body}
          className={styles.body}
        />
      ) : null}
      {(job.projects ?? []).map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          period={formatPeriod(project, locale, presentLabel)}
        />
      ))}
      {stack.length > 0 ? <StackLine items={stack} /> : null}
    </article>
  );
}
