import { connection } from "next/server";

import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getStrings } from "@/i18n/strings";
import { getHomepage } from "@/lib/cms/getHomepage";
import { getSite } from "@/lib/cms/getSite";
import { formatPeriod } from "@/lib/formatPeriod";

import styles from "./CmsDump.module.scss";

export async function CmsDump() {
  await connection();

  const locale = DEFAULT_LOCALE;
  const { experience } = getStrings(locale);
  const [site, homepage] = await Promise.all([getSite(locale), getHomepage(locale)]);

  return (
    <main className={styles.page}>
      <h1>CMS data</h1>
      <h2>Periods</h2>
      <ul>
        {(homepage.experience.jobs ?? []).map((job) => (
          <li key={job.id}>{`${job.position}: ${formatPeriod(job, locale, experience.present)}`}</li>
        ))}
      </ul>
      <h2>site</h2>
      <pre className={styles.dump}>{JSON.stringify(site, null, 2)}</pre>
      <h2>homepage</h2>
      <pre className={styles.dump}>{JSON.stringify(homepage, null, 2)}</pre>
    </main>
  );
}
