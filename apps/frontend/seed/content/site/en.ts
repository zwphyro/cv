import { asset } from "../../asset";
import type { SeedSite } from "../../types";

export const site = {
  name: "Maxim Starodubov",
  seo: {
    title: "Maxim Starodubov | Full-Stack Engineer",
    description:
      "I build web products end to end: interface, API, database and production deployment. "
      + "3+ years of commercial experience with startups and B2B teams.",
  },
  cv: asset("Maxim_Starodubov_Full_Stack_Engineer_2026-10-07.pdf"),
  contacts: [
    {
      kind: "email",
      label: "Email",
      value: "m.starodubov.dev@gmail.com",
      href: "mailto:m.starodubov.dev@gmail.com",
      quickContact: "secondary",
    },
    {
      kind: "telegram",
      label: "Telegram",
      value: "@mstarodubovdev",
      href: "https://t.me/mstarodubovdev",
      quickContact: "primary",
    },
    {
      kind: "phone",
      label: "Phone",
      value: "+995 599 002 706",
      href: "tel:+995599002706",
      quickContact: "none",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      value: "maxim-starodubov",
      href: "https://linkedin.com/in/maxim-starodubov",
      quickContact: "none",
    },
    {
      kind: "github",
      label: "GitHub",
      value: "zwphyro",
      href: "https://github.com/zwphyro",
      quickContact: "none",
    },
  ],
} satisfies SeedSite;
