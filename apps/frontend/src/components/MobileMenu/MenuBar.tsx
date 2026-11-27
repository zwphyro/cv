import type { ReactNode } from "react";

import { Brand } from "@/components/Header/Brand";
import { ScrollProgress } from "@/components/Header/ScrollProgress";
import { cx } from "@/lib/cx";

import styles from "./MenuBar.module.scss";

interface MenuBarProps {
  name: string;
  linked: boolean;
  action: ReactNode;
  className?: string;
}

export function MenuBar({ name, linked, action, className }: MenuBarProps) {
  return (
    <div className={cx(styles.bar, className)}>
      <Brand
        name={name}
        linked={linked}
      />
      <div className={styles.controls}>
        <ScrollProgress variant="mobile" />
        {action}
      </div>
    </div>
  );
}
