import type { ComponentProps, ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./FramedBox.module.scss";

type FramedBoxProps = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  titleId?: string;
};

export function FramedBox({ title, titleId, className, children, ...props }: FramedBoxProps) {
  return (
    <div
      className={cx(styles.box, className)}
      {...props}
    >
      <h3
        id={titleId}
        className={styles.title}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
