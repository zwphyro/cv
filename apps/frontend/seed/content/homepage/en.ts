import { markdown } from "../../markdown";
import { period } from "../../period";
import type { SeedHomepage } from "../../types";

export const homepage = {
  hero: {
    status: "Open to new opportunities · [Remote / relocation]",
    title: "Full-Stack Engineer",
    description:
      "I build web products end to end: interface, API, database and production deployment. "
      + "3+ years of commercial experience with startups and B2B teams. "
      + "I care about clean architecture, design systems and reliable contracts between frontend and backend.",
    facts: [
      { value: "3+ years", caption: "of commercial development", highlighted: true },
      { value: "End to end", caption: "UI, API, database and deployment", highlighted: false },
      { value: "Solo to production", caption: "shipped a client website as the only developer", highlighted: false },
    ],
  },
  skills: {
    title: "Skills",
    navLabel: "Skills",
    intro: "My main stack is listed first in each group, with the year I started using it in production.",
    groups: [
      {
        title: "Frontend",
        items: [
          { name: "TypeScript", since: 2024, note: "Typed API clients, component libraries" },
          { name: "React", since: 2024, note: "Web apps and reusable UI kits" },
          { name: "Next.js", since: 2026, note: "Production website with i18n and CMS" },
        ],
        also: ["Tailwind CSS", "shadcn/ui", "MUI", "Sass", "CSS Modules", "Lit", "Payload CMS", "OpenAPI"],
      },
      {
        title: "Backend",
        items: [
          { name: "Python", since: 2023, note: "Services, automation, background jobs" },
          { name: "FastAPI", since: 2024, note: "REST APIs for internal tools" },
          { name: "PostgreSQL", since: 2024, note: "Schemas and migrations" },
        ],
        also: ["SQLAlchemy", "Alembic", "Django REST Framework", "RabbitMQ", "Celery", "pytest"],
      },
      {
        title: "Infrastructure",
        items: [
          { name: "Docker", since: 2023, note: "Compose profiles for dev, staging and prod" },
          { name: "GitHub Actions", since: 2023, note: "CI/CD pipelines with change detection" },
        ],
        also: ["nginx", "Ansible", "Cloudflare", "Linux"],
      },
    ],
  },
  experience: {
    title: "Experience",
    navLabel: "Experience",
    jobs: [
      {
        position: "Full-Stack Engineer",
        company: "Self-employed",
        ...period("2025-11"),
        location: "Remote",
        body: null,
        projects: [
          {
            title: "Hotel website",
            ...period("2026-06"),
            body: markdown("homepage/en/hotel-website.md"),
            stack: ["Next.js", "Payload CMS", "Docker", "nginx", "Ansible", "GitHub Actions", "Cloudflare"],
          },
          {
            title: "Frontend migration",
            ...period("2025-11", "2026-05"),
            body: markdown("homepage/en/frontend-migration.md"),
            stack: ["React", "TypeScript", "shadcn/ui", "Tailwind CSS"],
          },
        ],
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "Payload CMS",
          "Docker",
          "nginx",
          "Ansible",
          "GitHub Actions",
          "Cloudflare",
        ],
      },
      {
        position: "Software Engineer",
        company: "IT services company (under NDA)",
        ...period("2024-09", "2025-10"),
        location: "Saint Petersburg",
        body: markdown("homepage/en/software-engineer.md"),
        projects: [],
        stack: [
          "TypeScript",
          "Lit",
          "React",
          "MUI",
          "Python",
          "FastAPI",
          "SQLAlchemy",
          "Django REST Framework",
          "RabbitMQ",
          "Celery",
        ],
      },
      {
        position: "Trainee Software Engineer",
        company: "Saint Petersburg Electrotechnical University",
        ...period("2023-09", "2024-06"),
        location: "Saint Petersburg",
        body: markdown("homepage/en/trainee-software-engineer.md"),
        projects: [],
        stack: ["Python", "GitHub Actions", "GitHub CLI", "Docker"],
      },
    ],
  },
  education: {
    title: "Education",
    navLabel: "Education",
    items: [
      {
        degree: "Bachelor's degree in Software Engineering",
        institution: "Saint Petersburg Electrotechnical University",
        ...period("2021-09", "2025-06"),
        details: markdown("homepage/en/bachelor.md"),
      },
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "English", level: "B2, upper-intermediate" },
      { name: "Russian", level: "native" },
    ],
  },
  contact: {
    title: "Looking for a new role",
    navLabel: "Contact",
    body: markdown("homepage/en/contact.md"),
    formTitle: "Write to me",
    successMessage: "Thank you! I'll get back to you within [one day].",
  },
} satisfies SeedHomepage;
