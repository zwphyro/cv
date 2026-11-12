from typing import Protocol

from src.entity.request import Request


class RequestNotifier(Protocol):
    async def request_created(self, request: Request, /) -> None: ...
