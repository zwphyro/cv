import { RevealGroup } from "@/components/Reveal/RevealGroup";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { MetricsBlock } from "@/payload-types";

import { MetricBar } from "./MetricBar";
import styles from "./MetricsPanel.module.scss";

type Metric = MetricsBlock["items"][number];

interface MetricsPanelProps {
  label: string;
  items: Metric[];
}

function formatValue({ value, max, suffix, showMax }: Metric) {
  return `${String(value)}${suffix ?? ""}${showMax ? ` / ${String(max)}` : ""}`;
}

export function MetricsPanel({ label, items }: MetricsPanelProps) {
  return (
    <RevealGroup className={styles.panel}>
      <Eyebrow>{label}</Eyebrow>
      <ul className={styles.rows}>
        {items.map((metric) => (
          <li
            key={metric.id ?? metric.name}
            className={styles.row}
          >
            <span className={styles.name}>{metric.name}</span>
            <span className={styles.meter}>
              <MetricBar
                value={metric.value}
                min={metric.min}
                max={metric.max}
                className={styles.bar}
              />
              <span className={styles.value}>{formatValue(metric)}</span>
            </span>
          </li>
        ))}
      </ul>
    </RevealGroup>
  );
}
