from collections.abc import Sequence
from typing import Protocol, Unpack
from uuid import UUID

from src.entity.request import Request, RequestPatch


class RequestRepository(Protocol):
    async def list(self) -> Sequence[Request]: ...

    async def get_by_id(self, id: UUID) -> Request | None: ...

    def add(self, request: Request) -> None: ...

    async def update_by_id(
        self, id: UUID, **values: Unpack[RequestPatch]
    ) -> Request | None: ...

    async def delete_by_id(self, id: UUID) -> Request | None: ...
