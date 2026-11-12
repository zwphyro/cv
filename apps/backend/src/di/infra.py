from typing import Annotated

from aiogram import Bot
from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from src.config.settings import Settings, get_settings
from src.pkg.postgres.database import Database
from src.pkg.turnstile.client import TurnstileClient
from src.repository.postgres.uow import PostgresUnitOfWork
from src.usecase.protocol.uow import UnitOfWork

SettingsDep = Annotated[Settings, Depends(get_settings)]


def get_database(request: Request):
    return request.app.state.database


DatabaseDep = Annotated[Database, Depends(get_database)]


def get_bot(request: Request):
    return request.app.state.bot


BotDep = Annotated[Bot | None, Depends(get_bot)]


def get_turnstile(request: Request):
    return request.app.state.turnstile


TurnstileDep = Annotated[TurnstileClient, Depends(get_turnstile)]


async def get_session(database: DatabaseDep):
    async with database.sessionmaker() as session:
        yield session


SessionDep = Annotated[AsyncSession, Depends(get_session)]


def get_uow(session: SessionDep) -> UnitOfWork:
    return PostgresUnitOfWork(session)


UnitOfWorkDep = Annotated[UnitOfWork, Depends(get_uow)]
