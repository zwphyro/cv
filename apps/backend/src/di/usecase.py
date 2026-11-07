from typing import Annotated

from fastapi import Depends

from src.di.infra import UnitOfWorkDep
from src.di.repository import RequestRepositoryDep
from src.usecase.request import RequestUsecase


def get_request_usecase(
    requests: RequestRepositoryDep,
    uow: UnitOfWorkDep,
):
    return RequestUsecase(requests, uow)


RequestUsecaseDep = Annotated[RequestUsecase, Depends(get_request_usecase)]
