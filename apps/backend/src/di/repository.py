from typing import Annotated

from fastapi import Depends

from src.di.infra import SessionDep
from src.repository.postgres.request import PostgresRequestRepository
from src.usecase.protocol.repository import RequestRepository


def get_request_repository(session: SessionDep) -> RequestRepository:
    return PostgresRequestRepository(session)


RequestRepositoryDep = Annotated[RequestRepository, Depends(get_request_repository)]
