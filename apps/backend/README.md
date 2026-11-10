## Backend

### Dependencies

> [!WARNING] Use Python version 3.14 or higher.  
> This documentation uses [uv](https://docs.astral.sh/uv/) as the package manager.

To install dependencies use the following command:
```bash
uv sync
```

### Development

To start a development server with reload use the following command:
```bash
uv run task start --dev
```

`--hostname` and `--port` options set the interface and port to listen on (`0.0.0.0` and `8000` by default).

To apply all migrations use the following command:
```bash
uv run task migrate-to-head
```

To generate a migration from the changes in models use the following command:
```bash
uv run task migrate-revision "<message>"
```

Generated migrations are formatted and linted with ruff automatically.

To check for linting errors, formatting, types ([basedpyright](https://docs.basedpyright.com/)) and architecture rules use the following command:
```bash
uv run task lint
```

You can fix most linting and formatting errors with the following command:
```bash
uv run task lint-fix
```

Creating a request requires a captcha token in the `X-Captcha-Token` header (see [Captcha](#captcha)). With the Cloudflare test secret key from [`.env.example`](./.env.example) any non-empty string passes:
```bash
curl -X POST http://localhost:8000/api/v1/requests/ \
  -H "Content-Type: application/json" \
  -H "X-Captcha-Token: test" \
  -d '{"author": "John", "email": "john@example.com", "message": "Hello"}'
```

Cloudflare test secret keys:
- `1x0000000000000000000000000000000AA` - always passes;
- `2x0000000000000000000000000000000AA` - always fails.

The verification is a real request to Cloudflare even with a test key, so creating a request needs internet access.

### Architecture

The code is split into layers, dependencies point only inwards (to `entity`):

```
src/
├── main.py              < application factory and lifespan
├── config/              < settings, logging, CLI arguments
├── entity/              < ORM models, patch types and domain errors
├── usecase/             < business logic
│   └── protocol/        < interfaces used by usecases (repositories, unit of work, notifiers, captcha)
├── repository/
│   └── postgres/        < protocol implementations on SQLAlchemy
├── gateway/             < protocol implementations on external services
│   ├── telegram/
│   ├── turnstile/
│   └── null/            < no-op implementations used when a service is not configured
├── controller/
│   └── http/
│       ├── errors.py    < domain error to HTTP status mapping
│       └── v1/          < routes and DTOs
├── di/                  < composition root: FastAPI dependency providers
└── pkg/                 < infrastructure clients independent of the application
```

```
main ──▶ controller ──▶ di ──▶ repository | gateway ──▶ usecase ──▶ entity
```

- `entity` does not depend on the application or web framework. Every model must be exported from `entity/__init__.py`, so that the whole model registry is loaded on any import (and is visible to migrations).
- `usecase` depends only on `entity` and its own `protocol`. Usecases receive only repositories they need and a `UnitOfWork`, and commit explicitly.
- `repository` and `gateway` implement protocols structurally, without inheriting them, and do not import each other.
- `controller` does not touch `repository`, `gateway`, `pkg` or SQLAlchemy, it gets usecases from `di`.
- `di` is the only place where implementations are bound to protocols. Providers return the protocol type, so the type checker verifies that implementation matches it. One session is created per request and shared between all repositories and the unit of work.

These rules are checked by [import-linter](https://import-linter.readthedocs.io/) as part of `uv run task lint`, contracts are defined in [`pyproject.toml`](./pyproject.toml).

#### Errors

Domain errors inherit from one of the categories in `entity/errors.py` (for example, `NotFoundError`). The category is mapped to the HTTP status in `ERROR_STATUS` in `controller/http/errors.py`, and every subclass gets the status of its nearest category. The application fails to start if some error has no category. Use `error_responses(...)` in routes to document error responses in OpenAPI.

#### Notifications

Usecases notify about events through protocols (for example, `RequestNotifier.request_created`), the message format belongs to the implementation in `gateway/`. Notifications are sent after the commit, and a failed notification is only logged: the data is already saved and the request does not fail. When a service is not configured, `di` provides the no-op implementation from `gateway/null/`.

#### Captcha

`RequestUsecase.create_request` verifies the captcha token through the `CaptchaVerifier` protocol before saving the request, the implementation in `gateway/turnstile/` calls Cloudflare Turnstile. A rejected token raises `CaptchaFailedError` (403). If Cloudflare is unavailable, the gateway raises `CaptchaUnavailableError` (503): the request is rejected rather than saved without verification. The secret key is required, so the verification cannot be disabled by configuration. Use test keys for development and replace `CaptchaVerifier` with a fake (or override `get_captcha_verifier` in FastAPI) in tests.

#### Adding a new resource

1. Model in `entity/`, exported from `entity/__init__.py`, and errors in `entity/errors.py`.
2. Repository protocol in `usecase/protocol/repository.py` and usecase in `usecase/`.
3. Repository implementation in `repository/postgres/` and, if needed, notifier implementations in `gateway/`.
4. Providers in `di/repository.py`, `di/gateway.py` and `di/usecase.py`.
5. DTOs and routes in `controller/http/v1/`, router included in `controller/http/v1/router.py`.
6. Migration with `uv run task migrate-revision "<message>"`.

### Production

In the deployed stand/production environment this app runs from the Docker image built by `apps/backend/Dockerfile`.

The image is a multi-stage build: production dependencies are installed by uv from the lockfile in a separate stage (a layer that only changes with `pyproject.toml` / `uv.lock`), the final stage contains only the virtual environment and the sources. It has no uv and no dev tools, runs as the unprivileged user and starts with `python -m command.run`. Migrations are applied before the start by the `backend_migrate` compose service, which runs `alembic upgrade head` in the same image. No environment setting is baked into the image: everything is read at runtime.

Without `--dev` the server writes plain one-line logs ([`config/logging.yaml`](./config/logging.yaml)), with `--dev` it uses rich output ([`config/logging.dev.yaml`](./config/logging.dev.yaml)).

The `/api/internal/health` endpoint is used by the container healthcheck.

#### Telegram notifications

The backend sends a message about every new request to a Telegram chat when `BACKEND_TG_BOT_TOKEN` and `BACKEND_TG_CHAT_ID` are set, otherwise notifications are disabled.

1. Create a bot with [@BotFather](https://t.me/BotFather) and use its token as `BACKEND_TG_BOT_TOKEN`.
2. Send `/start` to the bot (a bot cannot write to a user first) or add it to a group, if notifications should go to several people.
3. Get the chat id from `https://api.telegram.org/bot<token>/getUpdates` (`message.chat.id`, group ids are negative) and use it as `BACKEND_TG_CHAT_ID`.

Telegram API requests time out after 5 seconds, so an unavailable Telegram delays the response to a new request at most by this time.

#### Cloudflare Turnstile

1. Create a widget in the Cloudflare dashboard (Turnstile section) and add the site hostname to it.
2. Use its secret key as `BACKEND_TURNSTILE_SECRET_KEY`. The site key is public and belongs to the frontend.

Turnstile API requests time out after 5 seconds, after that the request is rejected with 503.

### Environment variables
See [environment documentation](../../docs/environment.md) for a detailed overview of environment variables.

List of used environment variables available in [`.env.example`](./.env.example) file.
