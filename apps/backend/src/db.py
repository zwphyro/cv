import uuid
from datetime import UTC, datetime
from re import sub
from typing import Annotated

from sqlalchemy import DateTime, func
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, declared_attr, mapped_column

from src.settings import get_settings

settings = get_settings()

engine = create_async_engine(settings.db_url)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


id = Annotated[uuid.UUID, mapped_column(primary_key=True, default=uuid.uuid4)]
created_at = Annotated[
    datetime, mapped_column(DateTime(timezone=True), server_default=func.now())
]
updated_at = Annotated[
    datetime,
    mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=lambda: datetime.now(UTC),
    ),
]
deleted_at = Annotated[
    datetime | None, mapped_column(DateTime(timezone=True), nullable=True, default=None)
]


class Base(AsyncAttrs, DeclarativeBase):
    __abstract__ = True

    @declared_attr.directive
    def __tablename__(cls):
        tmp = sub("(.)([A-Z][a-z]+)", r"\1_\2", cls.__name__)
        return sub("([a-z0-9])([A-Z])", r"\1_\2", tmp).lower() + "s"

    def __repr__(self) -> str:
        parameters = ", ".join(
            f"{key}={value!r}"
            for key, value in self.__dict__.items()
            if not key.startswith("_")
        )
        return f"<{self.__class__.__name__}({parameters})>"
