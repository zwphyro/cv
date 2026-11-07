from typing import Annotated

from fastapi import Depends

from src.dependencies import UOWDependency
from src.usecase.request import RequestsUsecase


def get_usecase(
    uow: UOWDependency,
):
    return RequestsUsecase(uow)


ServiceDependency = Annotated[RequestsUsecase, Depends(get_usecase)]
