import type { Site } from "@/payload-types";

export type Contact = NonNullable<Site["contacts"]>[number];

const QUICK_CONTACT_ORDER = ["primary", "secondary"] as const;

export function getQuickContacts(contacts: Contact[]) {
  return QUICK_CONTACT_ORDER.flatMap((kind) => contacts.filter((contact) => contact.quickContact === kind));
}
