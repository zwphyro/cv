import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, field_validator
from pydantic.json_schema import SkipJsonSchema


class CreateRequestRequest(BaseModel):
    author: str
    email: str
    message: str


class UpdateRequestRequest(BaseModel):
    author: str | SkipJsonSchema[None] = None
    email: str | SkipJsonSchema[None] = None
    message: str | SkipJsonSchema[None] = None

    @field_validator("author", "email", "message")
    @classmethod
    def forbid_null(cls, value: str | None):
        if value is None:
            raise ValueError("Field cannot be null")
        return value


class RequestSchema(BaseModel):
    id: uuid.UUID

    author: str
    title: str
    content: str

    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None

    model_config = ConfigDict(from_attributes=True)
