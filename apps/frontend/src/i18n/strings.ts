import type { Locale } from "./locales";

// Two levels deep so getStrings can merge a partial translation section by section
export interface UiStrings {
  header: {
    sectionsLabel: string;
    openMenu: string;
    closeMenu: string;
    menuLabel: string;
    quickContact: string;
  };
  hero: {
    contactMe: string;
    downloadCv: string;
    preparingCv: string;
    cvDownloaded: string;
  };
  skills: {
    since: string;
    also: string;
  };
  experience: {
    present: string;
  };
  contactForm: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submit: string;
    sending: string;
    sent: string;
    sendAnother: string;
    nameRequired: string;
    nameTooLong: string;
    emailRequired: string;
    emailInvalid: string;
    emailTooLong: string;
    messageRequired: string;
    messageTooLong: string;
    verificationFailed: string;
    sendFailed: string;
  };
  footer: {
    title: string;
    copy: string;
    copied: string;
    copyright: string;
  };
}

type PartialUiStrings = { [Section in keyof UiStrings]?: Partial<UiStrings[Section]> };

const en: UiStrings = {
  header: {
    sectionsLabel: "Sections",
    openMenu: "Menu",
    closeMenu: "Close",
    menuLabel: "Menu",
    quickContact: "Quick contact",
  },
  hero: {
    contactMe: "Contact me",
    downloadCv: "Download CV (PDF)",
    preparingCv: "Preparing",
    cvDownloaded: "CV downloaded",
  },
  skills: {
    since: "since {year}",
    also: "Also:",
  },
  experience: {
    present: "Present",
  },
  contactForm: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    submit: "Send message",
    sending: "Sending your message…",
    sent: "Message sent",
    sendAnother: "Send another message",
    nameRequired: "Enter your name",
    nameTooLong: "Name must be at most {max} characters",
    emailRequired: "Enter your email",
    emailInvalid: "Enter a valid email address",
    emailTooLong: "Email must be at most {max} characters",
    messageRequired: "Enter a message",
    messageTooLong: "Message must be at most {max} characters",
    verificationFailed: "Couldn't verify that you're not a bot. Please try again.",
    sendFailed: "Couldn't send the message. Please try again later.",
  },
  footer: {
    title: "Contacts",
    copy: "Copy",
    copied: "Copied",
    copyright: "© {year} {name}",
  },
};

const TRANSLATIONS: Partial<Record<Locale, PartialUiStrings>> = {};

export function getStrings(locale: Locale): UiStrings {
  const translation = TRANSLATIONS[locale];
  if (!translation) return en;

  const merged = { ...en };
  for (const section of Object.keys(en) as (keyof UiStrings)[]) {
    Object.assign(merged, { [section]: { ...en[section], ...translation[section] } });
  }
  return merged;
}
