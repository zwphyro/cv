import { RichText } from "@/components/RichText/RichText";
import { Section } from "@/components/Section/Section";
import { FramedBox } from "@/components/ui/FramedBox/FramedBox";
import type { Homepage } from "@/payload-types";

import styles from "./Contact.module.scss";
import { ContactForm } from "./ContactForm";

const FORM_TITLE_ID = "contact-form-title";

interface ContactProps {
  contact: Homepage["contact"];
  turnstileSiteKey: string;
}

export function Contact({ contact, turnstileSiteKey }: ContactProps) {
  return (
    <Section
      id="contact"
      title={contact.title}
      className={styles.section}
      headingClassName={styles.heading}
    >
      <div className={styles.layout}>
        <RichText
          data={contact.body}
          className={styles.body}
        />
        <FramedBox
          title={contact.formTitle}
          titleId={FORM_TITLE_ID}
          className={styles.formBox}
        >
          <ContactForm
            titleId={FORM_TITLE_ID}
            successMessage={contact.successMessage}
            turnstileSiteKey={turnstileSiteKey}
          />
        </FramedBox>
      </div>
    </Section>
  );
}
