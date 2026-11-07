from collections.abc import Callable
from types import TracebackType

from sqlalchemy.ext.asyncio import AsyncSession

from src.repository.postgres.request import RequestRepository


class UnitOfWork:
    def __init__(self, session_pool: Callable[..., AsyncSession]):
        self._session_pool = session_pool

    async def __aenter__(self):
        self._session = self._session_pool()
        self.requests = RequestRepository(self._session)
        return self

    async def __aexit__(
        self,
        exc_type: type[BaseException] | None,
        exc_val: BaseException | None,
        exc_tb: TracebackType | None,
    ):
        try:
            if exc_type is not None:
                await self.rollback()
        finally:
            await self.close()

    async def commit(self):
        try:
            await self._session.commit()
        except:
            await self.rollback()
            raise

    async def flush(self):
        await self._session.flush()

    async def rollback(self):
        await self._session.rollback()

    async def close(self):
        await self._session.close()
