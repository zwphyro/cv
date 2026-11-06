FROM node:24.22.2-alpine3.24 AS base

WORKDIR /app

FROM base AS deps

RUN corepack enable
COPY package.json ./
RUN corepack install

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS prod-deps

# Start from an empty tree so no devDependency is left behind in the virtual store;
# CI=true stops pnpm from asking for confirmation on a TTY
RUN rm -rf node_modules apps/frontend/node_modules \
    && CI=true pnpm install --frozen-lockfile --prod --offline

FROM deps AS build

ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=1

COPY apps/frontend ./apps/frontend
RUN pnpm --filter frontend run build \
    # Next copies any .env files it finds into the standalone output; never ship them
    && rm -f apps/frontend/.next/standalone/apps/frontend/.env*

FROM node:24.22.2-alpine3.24 AS migrate

ENV NODE_ENV=production
ENV NODE_OPTIONS=--no-deprecation

WORKDIR /app/apps/frontend

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/apps/frontend/node_modules ./node_modules
COPY --from=build /app/apps/frontend/package.json /app/apps/frontend/tsconfig.json ./
COPY --from=build /app/apps/frontend/src ./src

USER 1000:1000

CMD ["node_modules/.bin/payload", "migrate"]

FROM node:24.22.2-alpine3.24 AS run

ENV NODE_ENV=production
ENV NODE_OPTIONS=--no-deprecation
ENV NEXT_TELEMETRY_DISABLED=1

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app

COPY --from=build /app/apps/frontend/.next/standalone ./
COPY --from=build /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=build /app/apps/frontend/public ./apps/frontend/public
RUN mkdir -p apps/frontend/.next/cache && chown -R 1000:1000 apps/frontend/.next

USER 1000:1000

WORKDIR /app/apps/frontend

EXPOSE 3000

CMD ["node", "server.js"]
