import styles from "./StackLine.module.scss";

interface StackLineProps {
  items: string[];
}

export function StackLine({ items }: StackLineProps) {
  return <p className={styles.stack}>{items.join(" · ")}</p>;
}
