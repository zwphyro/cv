## Frontend

### Dependencies

> [!WARNING] Use Node.js version 24 or higher.  
> This documentation uses pnpm as the package manager, but you can use any package manager that you like.

To install dependencies use the following command:
```bash
pnpm install
```

To install locked dependencies for CI or production use the following command from the root of this repository:
```bash
pnpm install --frozen-lockfile
```

### Development

To start a development server use the following command:
```bash
pnpm dev
```

To check for linting errors use the following command:
```bash
pnpm lint
```

You can fix most linting errors with the following command:
```bash
pnpm lint:fix
```

### Build

To build the application use the following command:
```bash
pnpm build
```

To run a production build use the following command:
```bash
pnpm start
```

### Production

In the deployed stand/production environment this app runs from the Docker image built by `apps/frontend/Dockerfile`, not from `pnpm start` directly.

The image is a multi-stage build on top of Next's `output: "standalone"`: dependencies are installed once (a layer that only changes with `package.json` / `pnpm-lock.yaml`), the app is built on top of them. The final stage contains only the standalone server: `server.js` with the dependencies the build traced as actually used, `public`, and `.next/static`. It has no pnpm and no sources, runs as the unprivileged user (only `.next` is writable for Next's fetch cache), and starts with `node server.js`, which reads `PORT` and `HOSTNAME`. No environment setting is baked into the image: every URL and key is read at runtime, so the same image serves every environment.

### Environment variables
See [environment documentation](../../docs/environment.md) for a detailed overview of environment variables.

List of used environment variables available in [`.env.example`](./.env.example) file.

