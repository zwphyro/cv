import styles from "./StatCard.module.scss";

interface StatCardProps {
  value: string;
  caption: string;
}

export function StatCard({ value, caption }: StatCardProps) {
  return (
    <div className={styles.stat}>
      <span className={styles.value}>{value}</span>
      <span className={styles.caption}>{caption}</span>
    </div>
  );
}
