import logging

from src.entity.errors import NotFoundError
from src.usecase.protocol.repository import RequestRepository
from src.usecase.protocol.uow import UnitOfWork

log = logging.getLogger(__name__)


class RequestUsecase:
    def __init__(
        self,
        requests: RequestRepository,
        uow: UnitOfWork,
    ):
        self._requests = requests
        self._uow = uow

    async def create_request(self, *, author: str, email: str, message: str):
        news_post = await self._requests.create(author, email, message)

        await self._uow.commit()
        return news_post

    async def get_request(self, id: str):
        news_post = await self._requests.get_by_id(id)
        if news_post is None:
            raise NotFoundError

        return news_post

    async def list_requests(self):
        return await self._requests.list()

    async def replace_request(self, id: str, *, author: str, email: str, message: str):
        return await self.update_request(
            id, author=author, email=email, message=message
        )

    async def update_request(self, id: str, **values):
        if not values:
            return await self.get_request(id)

        news_post = await self._requests.update_by_id(id, **values)
        if news_post is None:
            raise NotFoundError

        await self._uow.commit()
        return news_post

    async def delete_request(self, id: str):
        news_post = await self._requests.delete_by_id(id)
        if news_post is None:
            raise NotFoundError

        await self._uow.commit()
        return news_post
