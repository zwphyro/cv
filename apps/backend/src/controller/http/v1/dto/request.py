import uuid
from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from pydantic.json_schema import SkipJsonSchema

from src.entity.request import AUTHOR_MAX_LENGTH, EMAIL_MAX_LENGTH, MESSAGE_MAX_LENGTH

Author = Annotated[str, Field(min_length=1, max_length=AUTHOR_MAX_LENGTH)]
Email = Annotated[EmailStr, Field(min_length=1, max_length=EMAIL_MAX_LENGTH)]
Message = Annotated[str, Field(min_length=1, max_length=MESSAGE_MAX_LENGTH)]


class CreateRequestRequest(BaseModel):
    author: Author
    email: Email
    message: Message


class UpdateRequestRequest(BaseModel):
    author: Author | SkipJsonSchema[None] = None
    email: Email | SkipJsonSchema[None] = None
    message: Message | SkipJsonSchema[None] = None

    @field_validator("author", "email", "message")
    @classmethod
    def forbid_null(cls, value: str | None):
        if value is None:
            raise ValueError("Field cannot be null")
        return value


class RequestSchema(BaseModel):
    id: uuid.UUID

    author: str
    email: str
    message: str

    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None

    model_config = ConfigDict(from_attributes=True)
