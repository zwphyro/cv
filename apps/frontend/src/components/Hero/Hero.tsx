import { PlaceholderText } from "@/components/PlaceholderText/PlaceholderText";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { StatusDot } from "@/components/ui/StatusDot/StatusDot";
import type { UiStrings } from "@/i18n/strings";
import type { CvFile } from "@/lib/cvFile";
import type { Homepage } from "@/payload-types";

import { CvButton } from "./CvButton";
import styles from "./Hero.module.scss";
import { HeroFacts } from "./HeroFacts";
import { HeroSection } from "./HeroSection";
import { ScrambleTitle } from "./ScrambleTitle";

const TITLE_ID = "hero-title";

interface HeroProps {
  hero: Homepage["hero"];
  name: string;
  cv: CvFile | null;
  strings: UiStrings["hero"];
}

export function Hero({ hero, name, cv, strings }: HeroProps) {
  const facts = hero.facts ?? [];

  return (
    <HeroSection
      titleId={TITLE_ID}
      below={facts.length > 0 ? <HeroFacts facts={facts} /> : null}
    >
      <p className={styles.status}>
        <StatusDot />
        <span>
          <PlaceholderText text={hero.status} />
        </span>
      </p>
      <div className={styles.heading}>
        <ScrambleTitle
          id={TITLE_ID}
          title={hero.title}
        />
        <p className={styles.name}>{name}</p>
      </div>
      <p className={styles.description}>{hero.description}</p>
      <div className={styles.actions}>
        <ButtonLink
          href="#contact"
          className={styles.action}
        >
          {strings.contactMe}
        </ButtonLink>
        {cv ? (
          <CvButton
            file={cv}
            className={styles.action}
          />
        ) : null}
      </div>
    </HeroSection>
  );
}
