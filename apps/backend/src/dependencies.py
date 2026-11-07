from typing import Annotated

from fastapi import Depends

from src.db import AsyncSessionLocal
from src.uow import UnitOfWork


async def get_uow():
    async with UnitOfWork(AsyncSessionLocal) as uow:
        yield uow


UOWDependency = Annotated[UnitOfWork, Depends(get_uow)]
