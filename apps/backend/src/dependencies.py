from typing import Annotated

from fastapi import Depends, Request

from src.uow import UnitOfWork


async def get_uow(request: Request):
    async with UnitOfWork(request.app.state.database.sessionmaker) as uow:
        yield uow


UOWDependency = Annotated[UnitOfWork, Depends(get_uow)]
