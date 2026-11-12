FROM python:3.15.0-alpine3.24 AS base

WORKDIR /app

FROM base AS deps

COPY --from=ghcr.io/astral-sh/uv:0.13.0 /uv /usr/local/bin/uv

ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV UV_PYTHON_DOWNLOADS=never

COPY pyproject.toml uv.lock .python-version ./
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-dev --no-install-project

FROM base AS run

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PATH="/app/.venv/bin:$PATH"

COPY --from=deps /app/.venv ./.venv

COPY alembic.ini ./
COPY config ./config
COPY migrations ./migrations
COPY command ./command
COPY src ./src

USER 1000:1000

EXPOSE 8000

CMD ["python", "-m", "command.run"]
