Took an existing prototype to production as the sole developer: Next.js, Payload CMS and a typed BFF layer between frontend and backend services.

<Metrics label="Lighthouse scores" items={[{ name: "Performance", value: 98 }, { name: "Accessibility", value: 95 }, { name: "Best Practices", value: 100 }]} />

- CI/CD on GitHub Actions rebuilds only the services that changed: from push to production in **under 7 minutes**.
- The client edits all site content in Payload CMS without a developer.
- Infrastructure from scratch: VPS, domain, Cloudflare, nginx, Ansible, Docker Compose profiles for dev, staging and prod.
- Four languages with hreflang, light and dark themes, analytics and a CAPTCHA-protected lead form.
