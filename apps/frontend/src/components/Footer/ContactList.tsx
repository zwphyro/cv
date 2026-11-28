import { Arrow } from "@/components/ui/Arrow/Arrow";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { Contact } from "@/lib/contacts";

import styles from "./ContactList.module.scss";
import { CopyButton } from "./CopyButton";

interface ContactListProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: ContactListProps) {
  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className={styles.item}
        >
          <a
            href={contact.href}
            className={styles.link}
          >
            <span className={styles.text}>
              <Eyebrow>{contact.label}</Eyebrow>
              <span className={styles.value}>{contact.value}</span>
            </span>
            {contact.kind === "email" ? null : (
              <Arrow
                aria-hidden="true"
                className={styles.arrow}
              />
            )}
          </a>
          {contact.kind === "email" ? <CopyButton text={contact.value} /> : null}
        </li>
      ))}
    </ul>
  );
}
