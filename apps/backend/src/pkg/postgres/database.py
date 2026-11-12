from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine


class Database:
    def __init__(self, url: str):
        self.engine = create_async_engine(url)
        self.sessionmaker = async_sessionmaker[AsyncSession](
            self.engine, expire_on_commit=False
        )

    async def dispose(self):
        await self.engine.dispose()
