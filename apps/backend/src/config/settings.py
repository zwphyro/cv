import os
from functools import lru_cache
from pathlib import Path

from pydantic import Field, SecretStr, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]
PROJECT_ROOT = BASE_DIR.parent.parent


class Settings(BaseSettings):
    db_name: str = Field(..., alias="BACKEND_DB_NAME")
    db_host: str = Field(..., alias="POSTGRES_HOST")
    db_port: int = Field(..., alias="POSTGRES_PORT")
    db_user: str = Field(..., alias="BACKEND_DB_USER")
    db_password: str = Field(..., alias="BACKEND_DB_PASSWORD")

    log_level: str = Field(..., alias="BACKEND_LOG_LEVEL")

    tg_bot_token: SecretStr | None = Field(None, alias="BACKEND_TG_BOT_TOKEN")
    tg_chat_id: int | None = Field(None, alias="BACKEND_TG_CHAT_ID")

    model_config = SettingsConfigDict(
        env_file=os.path.join(BASE_DIR / ".env"),
        env_ignore_empty=True,
        extra="ignore",
    )

    @model_validator(mode="after")
    def check_telegram(self):
        if (self.tg_bot_token is None) != (self.tg_chat_id is None):
            raise ValueError(
                "BACKEND_TG_BOT_TOKEN and BACKEND_TG_CHAT_ID must be set together"
            )
        return self

    @property
    def db_url(self) -> str:
        return (
            f"postgresql+asyncpg://{self.db_user}:{self.db_password}"
            f"@{self.db_host}:{self.db_port}/{self.db_name}"
        )


@lru_cache
def get_settings():
    return Settings()  # pyright: ignore[reportCallIssue]
