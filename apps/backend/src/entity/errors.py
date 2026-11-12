from typing import ClassVar


class AppError(Exception):
    message: ClassVar[str] = "Application error"

    def __init__(self, message: str | None = None):
        super().__init__(message or self.message)


class NotFoundError(AppError):
    message = "Resource not found"


class RequestNotFoundError(NotFoundError):
    message = "Request not found"


class ForbiddenError(AppError):
    message = "Access denied"


class CaptchaFailedError(ForbiddenError):
    message = "Captcha verification failed"


class ServiceUnavailableError(AppError):
    message = "Service temporarily unavailable"


class CaptchaUnavailableError(ServiceUnavailableError):
    message = "Captcha verification is temporarily unavailable"
