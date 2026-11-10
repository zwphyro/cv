from typing import Protocol


class CaptchaVerifier(Protocol):
    async def verify(self, token: str, /) -> bool: ...
