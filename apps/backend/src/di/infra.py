from typing import Annotated

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from src.pkg.postgres.database import Database
from src.repository.postgres.uow import PostgresUnitOfWork
from src.usecase.protocol.uow import UnitOfWork


def get_database(request: Request):
    return request.app.state.database


DatabaseDep = Annotated[Database, Depends(get_database)]


async def get_session(database: DatabaseDep):
    # closing the session rolls back any uncommitted transaction
    async with database.sessionmaker() as session:
        yield session


SessionDep = Annotated[AsyncSession, Depends(get_session)]


def get_uow(session: SessionDep) -> UnitOfWork:
    return PostgresUnitOfWork(session)


UnitOfWorkDep = Annotated[UnitOfWork, Depends(get_uow)]
