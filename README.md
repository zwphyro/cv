## My web CV

Visit [my website](maxim-starodubov.dev) to see this project in action.

### Applications

- [Frontend](./apps/frontend/README.md)
- [Backend](./apps/backend/README.md)

### Getting started

> [!IMPORTANT] Docker and Docker Compose are the only hard requirements for running the whole stack. Running a single app on the host instead (for its own dev loop) needs that app's own toolchain - see its README, linked above.

1. Copy the root env template and fill in the blanks (reference [environment documentation](./docs/environment.md) to see which ones are required):
  ```bash
  cp .env.example .env
  ```
2. Build the images and start every service:
  ```bash
  docker compose up --build
  ```
  This also creates all neccessary roles and databases for Postgres and provisions bucket for S3. It also runs migrations.

3. Once it's up:
  - Frontend: http://localhost:3000
  - Backend API docs: http://localhost:8000/docs
  - CMS admin: http://localhost:3000/admin
  - RustFS console: http://localhost:9001

  RustFS is dev-only and belong to the `dev` compose profile, which `.env.example` enables (`COMPOSE_PROFILES=dev`). Without that variable only the production services start, and the CMS then needs real `S3_*` settings.

To work on a single app with fast reload, start it's dependencies in Docker and run the app itself on host. Each applicatoin's README covers it's development startup instuctions in "Development" section.

### Environment variables

See [environment documentation](./docs/environment.md) for a detailed overview of environment variables.
