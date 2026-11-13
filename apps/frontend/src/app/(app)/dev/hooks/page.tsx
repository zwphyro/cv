import { notFound } from "next/navigation";

import { FrameStats } from "./_components/FrameStats";
import { RevealBar } from "./_components/RevealBar";
import { StatusPanel } from "./_components/StatusPanel";
import { TimedFlagButton } from "./_components/TimedFlagButton";
import styles from "./page.module.scss";
import { SECTION_IDS } from "./sections";

export default function HooksPlaygroundPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className={styles.page}>
      <StatusPanel />
      <div
        className={styles.line}
        style={{ top: "40vh" }}
      >
        40% — active section
      </div>
      <div
        className={styles.line}
        style={{ top: "80vh" }}
      >
        80% — reveal
      </div>

      <section className={styles.hero}>
        <h1>Hooks playground</h1>
        <p>No section is active until Skills crosses the 40% line.</p>
        <FrameStats />
        <TimedFlagButton />
      </section>

      {SECTION_IDS.map((id) => (
        <section
          key={id}
          id={id}
          className={styles.section}
        >
          <h2>{id}</h2>
          {id === "skills" || id === "experience" ? <RevealBar label={`reveal.${id}`} /> : null}
        </section>
      ))}
    </main>
  );
}
