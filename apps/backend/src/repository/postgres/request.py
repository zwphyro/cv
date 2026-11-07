from typing import Any

from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.entity.request import Request


class PostgresRequestRepository:
    def __init__(self, session: AsyncSession):
        self._session = session

    async def list(self):
        query = select(Request).where(Request.deleted_at.is_(None))
        result = await self._session.execute(query)

        return result.scalars().all()

    async def get_by_id(self, id: str):
        query = select(Request).where(Request.id == id, Request.deleted_at.is_(None))
        result = await self._session.execute(query)

        return result.scalars().first()

    async def create(self, author: str, email: str, message: str):
        post = Request(author=author, email=email, message=message)
        self._session.add(post)

        return post

    async def update_by_id(self, id: str, **values: Any):
        query = (
            update(Request)
            .where(Request.id == id, Request.deleted_at.is_(None))
            .values(**values)
            .returning(Request)
        )
        result = await self._session.execute(query)

        return result.scalars().first()

    async def delete_by_id(self, id: str):
        return await self.update_by_id(id, deleted_at=func.now())
