from typing import Annotated

from fastapi import Depends

from src.dependencies import UOWDependency
from src.requests.service import RequestsService


def get_service(
    uow: UOWDependency,
):
    return RequestsService(uow)


ServiceDependency = Annotated[RequestsService, Depends(get_service)]
