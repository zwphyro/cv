import styles from "./PlaceholderText.module.scss";

const PLACEHOLDER = /(\[[^\]]+\])/;

interface PlaceholderTextProps {
  text: string;
}

function splitWithOffsets(text: string) {
  let offset = 0;
  return text.split(PLACEHOLDER).map((part) => {
    const start = offset;
    offset += part.length;
    return { part, start };
  });
}

export function PlaceholderText({ text }: PlaceholderTextProps) {
  return splitWithOffsets(text).map(({ part, start }) =>
    PLACEHOLDER.test(part) ? (
      <span
        key={start}
        className={styles.placeholder}
      >
        {part}
      </span>
    ) : (
      part
    ));
}
