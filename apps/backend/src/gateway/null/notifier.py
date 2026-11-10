from src.entity.request import Request


class NullRequestNotifier:
    async def request_created(self, _request: Request):
        pass
