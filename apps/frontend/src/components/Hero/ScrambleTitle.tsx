"use client";

import { BlockCursor } from "@/components/ui/BlockCursor/BlockCursor";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./ScrambleTitle.module.scss";
import { useScramble } from "./useScramble";

interface ScrambleTitleProps {
  id: string;
  title: string;
}

export function ScrambleTitle({ id, title }: ScrambleTitleProps) {
  const reducedMotion = usePrefersReducedMotion();
  const words = useScramble(title, reducedMotion === false).split(" ");

  return (
    <h1
      id={id}
      aria-label={title}
      className={styles.title}
    >
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            // Words keep their place: the scrambled text has the same number of words as the title
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={styles.word}
          >
            {word}
            {index === words.length - 1 ? (
              <BlockCursor
                blinking
                className={styles.cursor}
              />
            ) : null}
          </span>
        )).flatMap((word, index) => (index === 0 ? [word] : [" ", word]))}
      </span>
    </h1>
  );
}
