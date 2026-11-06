## Environment variables
Detailed overview of environment variables.

### Compose
| Variable | Used by | Required | Default | GitHub | Description |
|---|---|---|---|---|---|
| `COMPOSE_PROFILES` | compose | No | empty | - | Compose profiles to start. `dev` adds the dev-only RustFS. |

### Frontend
| Variable | Used by | Required | Default | GitHub | Comment |
|---|---|---|---|---|---|
| `FRONTEND_PORT` | compose | No | `3000` | var | |

### CMS
| Variable | Used by | Required | Default | GitHub | Comment |
|---|---|---|---|---|---|
| `CMS_DB_NAME` | cms, postgres | Yes | - | var | |
| `CMS_DB_USER` | cms, postgres | Yes | - | var | |
| `CMS_DB_PASSWORD` | cms, postgres | Yes | - | secret | |
| `CMS_SECRET` | cms | Yes | - | secret | Secret Payload uses to sign and encrypt auth tokens/cookies. |
| `CMS_ADMIN_EMAIL` | cms | No | - | secret | Used to create admin account automatically. |
| `CMS_ADMIN_PASSWORD` | cms | No | - | secret | CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD must be specified or unspecified simultaneously |

### Backend
| Variable | Used by | Required | Default | GitHub | Comment |
|---|---|---|---|---|---|
| `BACKEND_DB_NAME` | backend, postgres | Yes | - | var | |
| `BACKEND_DB_USER` | backend, postgres | Yes | - | var | |
| `BACKEND_DB_PASSWORD` | backend, postgres | Yes | - | secret | |


### Postgres
At first startup Postgres runs [initialization script](../infra/postgres/init.sh) to create all neccessary roles and databases for applications.

| Variable | Used by | Required | Default | GitHub | Comment |
|---|---|---|---|---|---|
| `POSTGRES_USER` | postgres | Yes | - | var | Admin (superuser). Used only by the Postgres container to create the databases and roles, the apps never connect with it. |
| `POSTGRES_PASSWORD` | postgres, postgres | Yes | - | secret | |
| `POSTGRES_PORT` | compose | No | `5432` | var | |

#### RustFS & S3
RustFS is the dev-only S3-compatible object storage the CMS uses for media locally. `S3_*` is the generic client config the CMS actually reads: when left empty, `docker-compose.yaml` fills it from the `RUSTFS_*` values. Set it to point the CMS at another S3-compatible store such as Cloudflare R2.

| Variable | Used by | Required | Default | GitHub | Comment |
|---|---|---|---|---|---|
| `RUSTFS_PORT` | compose | No | `9000` | var | |
| `RUSTFS_CONSOLE_PORT` | compose | No | `9001` | var | |
| `RUSTFS_BUCKET` | rustfs, cms | In development | - | var | |
| `RUSTFS_ACCESS_KEY` | rustfs, cms | In development | - | var | |
| `RUSTFS_SECRET_KEY` | rustfs, cms | In development | - | secret | |
| `S3_ENDPOINT` | cms | If not using RustFS | `http://minio:9000` | var | |
| `S3_REGION` | cms | If not using RustFS | `us-east-1` | var | |
| `S3_BUCKET` | cms | If not using RustFS | `${RUSTFS_BUCKET}` | var | |
| `S3_ACCESS_KEY_ID` | cms | If not using RustFS | `${RUSTFS_ACCESS_KEY}` | secret | |
| `S3_SECRET_ACCESS_KEY` | cms | If not using RustFS | `${RUSTFS_SECRET_KEY}` | secret | |
