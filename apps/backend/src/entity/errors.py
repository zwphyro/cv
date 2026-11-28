from enum import StrEnum
from typing import ClassVar


class ErrorCode(StrEnum):
    INTERNAL_ERROR = "internal_error"
    NOT_FOUND = "not_found"
    REQUEST_NOT_FOUND = "request_not_found"
    FORBIDDEN = "forbidden"
    CAPTCHA_FAILED = "captcha_failed"
    SERVICE_UNAVAILABLE = "service_unavailable"
    CAPTCHA_UNAVAILABLE = "captcha_unavailable"


class AppError(Exception):
    message: ClassVar[str] = "Application error"
    code: ClassVar[ErrorCode] = ErrorCode.INTERNAL_ERROR

    def __init__(self, message: str | None = None):
        super().__init__(message or self.message)


class NotFoundError(AppError):
    message = "Resource not found"
    code = ErrorCode.NOT_FOUND


class RequestNotFoundError(NotFoundError):
    message = "Request not found"
    code = ErrorCode.REQUEST_NOT_FOUND


class ForbiddenError(AppError):
    message = "Access denied"
    code = ErrorCode.FORBIDDEN


class CaptchaFailedError(ForbiddenError):
    message = "Captcha verification failed"
    code = ErrorCode.CAPTCHA_FAILED


class ServiceUnavailableError(AppError):
    message = "Service temporarily unavailable"
    code = ErrorCode.SERVICE_UNAVAILABLE


class CaptchaUnavailableError(ServiceUnavailableError):
    message = "Captcha verification is temporarily unavailable"
    code = ErrorCode.CAPTCHA_UNAVAILABLE
