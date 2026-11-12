from typing import Annotated

from fastapi import Depends

from src.di.gateway import CaptchaVerifierDep, RequestNotifierDep
from src.di.infra import UnitOfWorkDep
from src.di.repository import RequestRepositoryDep
from src.usecase.request import RequestUsecase


def get_request_usecase(
    requests: RequestRepositoryDep,
    uow: UnitOfWorkDep,
    notifier: RequestNotifierDep,
    captcha: CaptchaVerifierDep,
):
    return RequestUsecase(requests, uow, notifier, captcha)


RequestUsecaseDep = Annotated[RequestUsecase, Depends(get_request_usecase)]
