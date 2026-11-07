import logging
from collections.abc import Iterator, Mapping
from typing import Any, Final

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict

from src.entity.errors import AppError, NotFoundError

log = logging.getLogger(__name__)

# every AppError subclass must inherit from one of these categories
ERROR_STATUS: Final[Mapping[type[AppError], int]] = {
    NotFoundError: status.HTTP_404_NOT_FOUND,
}


class ErrorResponse(BaseModel):
    detail: str

    model_config = ConfigDict(
        json_schema_extra={"example": {"detail": "Error message"}}
    )


def find_status(error: type[AppError]):
    for cls in error.__mro__:
        if issubclass(cls, AppError) and cls in ERROR_STATUS:
            return ERROR_STATUS[cls]
    return None


def resolve_status(error: type[AppError]):
    status_code = find_status(error)
    if status_code is None:
        raise LookupError(f"{error.__name__} has no HTTP status")
    return status_code


def error_responses(*errors: type[AppError]) -> dict[int | str, dict[str, Any]]:
    return {resolve_status(error): {"model": ErrorResponse} for error in errors}


def _subclasses(error: type[AppError]) -> Iterator[type[AppError]]:
    for subclass in error.__subclasses__():
        yield subclass
        yield from _subclasses(subclass)


def register_error_handlers(app: FastAPI):
    unmapped = [
        error.__name__ for error in _subclasses(AppError) if find_status(error) is None
    ]
    if unmapped:
        raise RuntimeError(f"Errors without HTTP status: {', '.join(unmapped)}")

    @app.exception_handler(AppError)
    async def handle_app_error(_: Request, exc: AppError):
        status_code = find_status(type(exc))
        if status_code is None:
            log.error("Unmapped application error", exc_info=exc)
            return _error_response(
                status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error"
            )

        return _error_response(status_code, str(exc))


def _error_response(status_code: int, detail: str):
    return JSONResponse(
        status_code=status_code,
        content=ErrorResponse(detail=detail).model_dump(),
    )
