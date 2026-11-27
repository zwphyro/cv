"use client";

import { useStrings } from "@/components/StringsProvider/StringsProvider";
import { Button } from "@/components/ui/Button/Button";
import { TextArea } from "@/components/ui/Field/TextArea";
import { TextField } from "@/components/ui/Field/TextField";

import { bindField } from "./bindField";
import styles from "./ContactForm.module.scss";
import { CONTACT_LIMITS } from "./contactSchema";
import { ContactTurnstile } from "./ContactTurnstile";
import { SendingStatus } from "./SendingStatus";
import { SentStatus } from "./SentStatus";
import { useContactForm } from "./useContactForm";
import { useStatusFocus } from "./useStatusFocus";

interface ContactFormProps {
  titleId: string;
  successMessage: string;
  turnstileSiteKey: string;
}

export function ContactForm({ titleId, successMessage, turnstileSiteKey }: ContactFormProps) {
  const { contactForm: strings } = useStrings();
  const { form, phase, submitError, turnstile, startOver } = useContactForm(strings);
  const { sentTitleRef, firstFieldRef, restart } = useStatusFocus(phase, startOver);

  return (
    <>
      {/* Kept mounted while hidden, so the entered text and the captcha widget survive a failed attempt */}
      <form
        aria-labelledby={titleId}
        noValidate
        hidden={phase === "sending" || phase === "sent"}
        className={styles.form}
        onFocusCapture={turnstile.activate}
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.Field name="author">
          {(field) => (
            <TextField
              ref={firstFieldRef}
              label={strings.authorLabel}
              autoComplete="name"
              maxLength={CONTACT_LIMITS.author}
              {...bindField(field)}
            />
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <TextField
              label={strings.emailLabel}
              type="email"
              autoComplete="email"
              maxLength={CONTACT_LIMITS.email}
              {...bindField(field)}
            />
          )}
        </form.Field>
        <form.Field name="message">
          {(field) => (
            <TextArea
              label={strings.messageLabel}
              maxLength={CONTACT_LIMITS.message}
              {...bindField(field)}
            />
          )}
        </form.Field>
        {turnstile.active ? (
          <ContactTurnstile
            siteKey={turnstileSiteKey}
            {...turnstile.widgetProps}
          />
        ) : null}
        {submitError ? (
          <p
            role="alert"
            className={styles.error}
          >
            <span aria-hidden="true">✗</span>
            {` ${submitError}`}
          </p>
        ) : null}
        <Button
          type="submit"
          disabled={phase === "verifying"}
          className={styles.submit}
        >
          {strings.submit}
        </Button>
      </form>
      {phase === "sending" ? <SendingStatus text={strings.sending} /> : null}
      {phase === "sent" ? (
        <SentStatus
          title={strings.sent}
          message={successMessage}
          againLabel={strings.sendAnother}
          titleRef={sentTitleRef}
          onAgain={restart}
        />
      ) : null}
    </>
  );
}
