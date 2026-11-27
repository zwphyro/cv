import type { ReactNode } from "react";

import { Brand } from "@/components/Header/Brand";
import { ScrollProgress } from "@/components/Header/ScrollProgress";

import styles from "./MenuBar.module.scss";

interface MenuBarProps {
  name: string;
  linked: boolean;
  action: ReactNode;
}

export function MenuBar({ name, linked, action }: MenuBarProps) {
  return (
    <div className={styles.bar}>
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
