import logging
from collections.abc import Callable
from typing import Any, Protocol

from src.entity.request import Request
from src.usecase.protocol.notifier import RequestNotifier

log = logging.getLogger(__name__)


class TaskScheduler(Protocol):
    def add_task[**P](
        self, func: Callable[P, Any], *args: P.args, **kwargs: P.kwargs
    ) -> None: ...


class BackgroundRequestNotifier:
    def __init__(self, notifier: RequestNotifier, tasks: TaskScheduler):
        self._notifier = notifier
        self._tasks = tasks

    async def request_created(self, request: Request):
        self._tasks.add_task(self._notify, request)

    async def _notify(self, request: Request):
        try:
            await self._notifier.request_created(request)
        except Exception:
            log.exception("Failed to notify about request %s", request.id)
