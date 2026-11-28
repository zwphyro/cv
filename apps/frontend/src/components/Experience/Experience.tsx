import { Section } from "@/components/Section/Section";
import type { Locale } from "@/i18n/locales";
import type { Homepage } from "@/payload-types";

import styles from "./Experience.module.scss";
import { JobCard } from "./JobCard";
import { Timeline } from "./Timeline";

interface ExperienceProps {
  experience: Homepage["experience"];
  locale: Locale;
  presentLabel: string;
}

export function Experience({ experience, locale, presentLabel }: ExperienceProps) {
  const items = (experience.jobs ?? []).map((job, index) => ({
    id: job.id ?? String(index),
    content: (
      <JobCard
        job={job}
        locale={locale}
        presentLabel={presentLabel}
      />
    ),
  }));

  return (
    <Section
      id="experience"
      title={experience.title}
      headingClassName={styles.heading}
    >
      <Timeline items={items} />
    </Section>
  );
}
