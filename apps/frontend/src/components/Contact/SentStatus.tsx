import { type Ref } from "react";

import { PlaceholderText } from "@/components/PlaceholderText/PlaceholderText";
import { Button } from "@/components/ui/Button/Button";

import styles from "./ContactForm.module.scss";

interface SentStatusProps {
  title: string;
  message: string;
  againLabel: string;
  titleRef: Ref<HTMLParagraphElement>;
  onAgain: () => void;
}

export function SentStatus({ title, message, againLabel, titleRef, onAgain }: SentStatusProps) {
  return (
    <div
      role="status"
      className={styles.status}
    >
      <p
        ref={titleRef}
        tabIndex={-1}
        className={styles.sentTitle}
      >
        <span
          aria-hidden="true"
          className={styles.check}
        >
          ✓
        </span>
        {` ${title}`}
      </p>
      <p className={styles.sentMessage}>
        <PlaceholderText text={message} />
      </p>
      <Button
        variant="ghost"
        size="md"
        className={styles.again}
        onClick={onAgain}
      >
        {againLabel}
      </Button>
    </div>
  );
}
