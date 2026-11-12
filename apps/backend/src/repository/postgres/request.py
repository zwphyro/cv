from collections.abc import Mapping
from typing import Unpack
from uuid import UUID

from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.entity.request import Request, RequestPatch


class PostgresRequestRepository:
    def __init__(self, session: AsyncSession):
        self._session = session

    async def list(self):
        query = select(Request).where(Request.deleted_at.is_(None))
        result = await self._session.execute(query)

        return result.scalars().all()

    async def get_by_id(self, id: UUID):
        query = select(Request).where(Request.id == id, Request.deleted_at.is_(None))
        result = await self._session.execute(query)

        return result.scalars().first()

    def add(self, request: Request):
        self._session.add(request)

    async def update_by_id(self, id: UUID, **values: Unpack[RequestPatch]):
        return await self._update_by_id(id, values)

    async def delete_by_id(self, id: UUID):
        return await self._update_by_id(id, {"deleted_at": func.now()})

    async def _update_by_id(self, id: UUID, values: Mapping[str, object]):
        query = (
            update(Request)
            .where(Request.id == id, Request.deleted_at.is_(None))
            .values(values)
            .returning(Request)
        )
        result = await self._session.execute(query)

        return result.scalars().first()
