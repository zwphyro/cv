import { BlockCursor } from "@/components/ui/BlockCursor/BlockCursor";

import styles from "./Brand.module.scss";

interface BrandProps {
  name: string;
  linked?: boolean;
}

export function Brand({ name, linked = true }: BrandProps) {
  const content = (
    <>
      <BlockCursor className={styles.cursor} />
      <span>{name}</span>
    </>
  );

  return linked ? (
    <a
      href="#top"
      className={styles.brand}
    >
      {content}
    </a>
  ) : (
    <span className={styles.brand}>{content}</span>
  );
}
