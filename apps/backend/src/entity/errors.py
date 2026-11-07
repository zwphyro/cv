from typing import ClassVar


class AppError(Exception):
    message: ClassVar[str] = "Application error"

    def __init__(self, message: str | None = None):
        super().__init__(message or self.message)


class NotFoundError(AppError):
    message = "Resource not found"


class RequestNotFoundError(NotFoundError):
    message = "Request not found"
