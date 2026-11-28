import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { cx } from "@/lib/cx";
import type { SectionId } from "@/lib/sections";

import styles from "./Section.module.scss";

interface SectionProps {
  id: SectionId;
  title: string;
  className?: string;
  headingClassName?: string;
  children?: ReactNode;
}

export function Section({ id, title, className, headingClassName, children }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cx(styles.section, className)}
    >
      <SectionHeading
        id={titleId}
        className={headingClassName}
      >
        {title}
      </SectionHeading>
      {children}
    </section>
  );
}
