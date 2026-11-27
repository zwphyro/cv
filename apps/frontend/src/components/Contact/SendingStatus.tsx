import { Spinner } from "@/components/ui/Spinner/Spinner";

import styles from "./ContactForm.module.scss";

interface SendingStatusProps {
  text: string;
}

export function SendingStatus({ text }: SendingStatusProps) {
  return (
    <div
      role="status"
      className={styles.status}
    >
      <p className={styles.sending}>
        <Spinner />
        {` ${text}`}
      </p>
    </div>
  );
}
