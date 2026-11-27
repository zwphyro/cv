"use client";

import { useId } from "react";

import { useStrings } from "@/components/StringsProvider/StringsProvider";
import { Button } from "@/components/ui/Button/Button";
import type { Contact } from "@/lib/contacts";
import type { NavSection } from "@/lib/sections";

import { MenuBar } from "./MenuBar";
import { MenuNav } from "./MenuNav";
import styles from "./MobileMenu.module.scss";
import { QuickContacts } from "./QuickContacts";
import { useMenuDialog } from "./useMenuDialog";

interface MobileMenuProps {
  name: string;
  sections: NavSection[];
  quickContacts: Contact[];
}

export function MobileMenu({ name, sections, quickContacts }: MobileMenuProps) {
  const { header } = useStrings();
  const dialogId = useId();
  const { dialogRef, isOpen, open, close, handleClose } = useMenuDialog();

  return (
    <>
      <MenuBar
        name={name}
        linked
        action={(
          <Button
            variant="ghost"
            size="sm"
            aria-expanded={isOpen}
            aria-controls={dialogId}
            onClick={open}
          >
            {header.openMenu}
          </Button>
        )}
      />
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label={header.menuLabel}
        className={styles.dialog}
        onClose={handleClose}
      >
        <div className={styles.content}>
          <MenuBar
            name={name}
            linked={false}
            className={styles.bar}
            action={(
              <Button
                variant="ghost"
                size="sm"
                aria-expanded
                aria-controls={dialogId}
                onClick={close}
              >
                {header.closeMenu}
              </Button>
            )}
          />
          <MenuNav
            sections={sections}
            onNavigate={close}
          />
          <QuickContacts contacts={quickContacts} />
        </div>
      </dialog>
    </>
  );
}
