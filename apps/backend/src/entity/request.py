from typing import TypedDict

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from src.entity.base import Base, created_at, deleted_at, id, updated_at

AUTHOR_MAX_LENGTH = 100
EMAIL_MAX_LENGTH = 254
MESSAGE_MAX_LENGTH = 5000


class Request(Base):
    id: Mapped[id]

    author: Mapped[str] = mapped_column(String(AUTHOR_MAX_LENGTH))
    email: Mapped[str] = mapped_column(String(EMAIL_MAX_LENGTH))
    message: Mapped[str] = mapped_column(String(MESSAGE_MAX_LENGTH))

    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]
    deleted_at: Mapped[deleted_at]


class RequestPatch(TypedDict, total=False):
    author: str
    email: str
    message: str
