"use client";

import { TextBar } from "@/components/ui/TextBar/TextBar";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { MOBILE_QUERY, NARROW_QUERY } from "@/styles/breakpoints";

import { SECTION_IDS } from "../sections";
import styles from "./StatusPanel.module.scss";

export function StatusPanel() {
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useMediaQuery(MOBILE_QUERY);
  const narrow = useMediaQuery(NARROW_QUERY);
  const progress = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <dl className={styles.panel}>
      <dt>reduced motion</dt>
      <dd>{String(reducedMotion)}</dd>
      <dt>mobile</dt>
      <dd>{String(mobile)}</dd>
      <dt>narrow</dt>
      <dd>{String(narrow)}</dd>
      <dt>scroll</dt>
      <dd>
        <TextBar
          cells={progress * 12}
          total={12}
          track="strong"
        />
        {" "}
        {Math.round(progress * 100)}
        %
      </dd>
      <dt>active</dt>
      <dd>{activeSection ?? "—"}</dd>
    </dl>
  );
}
