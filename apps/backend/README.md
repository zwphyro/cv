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

### Architecture

The code is split into layers, dependencies point only inwards (to `entity`):

```
src/
├── main.py              < application factory and lifespan
├── config/              < settings, logging, CLI arguments
├── entity/              < ORM models, patch types and domain errors
├── usecase/             < business logic
│   └── protocol/        < interfaces used by usecases (repositories, unit of work)
├── repository/
│   └── postgres/        < protocol implementations on SQLAlchemy
├── controller/
│   └── http/
│       ├── errors.py    < domain error to HTTP status mapping
│       └── v1/          < routes and DTOs
├── di/                  < composition root: FastAPI dependency providers
└── pkg/                 < infrastructure clients independent of the application
```

```
main ──▶ controller ──▶ di ──▶ repository ──▶ usecase ──▶ entity
```

- `entity` does not depend on the application or web framework. Every model must be exported from `entity/__init__.py`, so that the whole model registry is loaded on any import (and is visible to migrations).
- `usecase` depends only on `entity` and its own `protocol`. Usecases receive only repositories they need and a `UnitOfWork`, and commit explicitly.
- `repository` implements protocols structurally, without inheriting them.
- `controller` does not touch `repository`, `pkg` or SQLAlchemy, it gets usecases from `di`.
- `di` is the only place where implementations are bound to protocols. Providers return the protocol type, so the type checker verifies that implementation matches it. One session is created per request and shared between all repositories and the unit of work.

These rules are checked by [import-linter](https://import-linter.readthedocs.io/) as part of `uv run task lint`, contracts are defined in [`pyproject.toml`](./pyproject.toml).

#### Errors

Domain errors inherit from one of the categories in `entity/errors.py` (for example, `NotFoundError`). The category is mapped to the HTTP status in `ERROR_STATUS` in `controller/http/errors.py`, and every subclass gets the status of its nearest category. The application fails to start if some error has no category. Use `error_responses(...)` in routes to document error responses in OpenAPI.

#### Adding a new resource

1. Model in `entity/`, exported from `entity/__init__.py`, and errors in `entity/errors.py`.
2. Repository protocol in `usecase/protocol/repository.py` and usecase in `usecase/`.
3. Repository implementation in `repository/postgres/`.
4. Providers in `di/repository.py` and `di/usecase.py`.
5. DTOs and routes in `controller/http/v1/`, router included in `controller/http/v1/router.py`.
6. Migration with `uv run task migrate-revision "<message>"`.

### Environment variables
See [environment documentation](../../docs/environment.md) for a detailed overview of environment variables.

List of used environment variables available in [`.env.example`](./.env.example) file.
