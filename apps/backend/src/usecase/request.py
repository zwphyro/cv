import logging
from typing import Unpack
from uuid import UUID

from src.entity.errors import RequestNotFoundError
from src.entity.request import Request, RequestPatch
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
        request = Request(author=author, email=email, message=message)
        self._requests.add(request)

        await self._uow.commit()
        return request

    async def get_request(self, id: UUID):
        request = await self._requests.get_by_id(id)
        if request is None:
            raise RequestNotFoundError

        return request

    async def list_requests(self):
        return await self._requests.list()

    async def replace_request(self, id: UUID, *, author: str, email: str, message: str):
        return await self.update_request(
            id, author=author, email=email, message=message
        )

    async def update_request(self, id: UUID, **values: Unpack[RequestPatch]):
        if not values:
            return await self.get_request(id)

        request = await self._requests.update_by_id(id, **values)
        if request is None:
            raise RequestNotFoundError

        await self._uow.commit()
        return request

    async def delete_request(self, id: UUID):
        request = await self._requests.delete_by_id(id)
        if request is None:
            raise RequestNotFoundError

        await self._uow.commit()
        return request
