from typing import Annotated

from fastapi import Depends

from src.gateway.null.request import NullRequestNotifier
from src.usecase.protocol.notifier import RequestNotifier


def get_request_notifier() -> RequestNotifier:
    return NullRequestNotifier()


RequestNotifierDep = Annotated[RequestNotifier, Depends(get_request_notifier)]
