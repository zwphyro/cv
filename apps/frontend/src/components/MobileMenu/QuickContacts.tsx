"use client";

import { useStrings } from "@/components/StringsProvider/StringsProvider";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { Contact } from "@/lib/contacts";

import styles from "./QuickContacts.module.scss";

interface QuickContactsProps {
  contacts: Contact[];
}

export function QuickContacts({ contacts }: QuickContactsProps) {
  const { header } = useStrings();

  return (
    <div className={styles.quickContacts}>
      <Eyebrow>{header.quickContact}</Eyebrow>
      {contacts.map((contact) => (
        <ButtonLink
          key={contact.id}
          href={contact.href}
          variant={contact.quickContact === "primary" ? "primary" : "ghost"}
          size="md"
          className={styles.link}
        >
          {`${contact.label} · ${contact.value}`}
        </ButtonLink>
      ))}
    </div>
  );
}
