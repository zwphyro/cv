from typing import Final

import httpx
from pydantic import BaseModel, Field

SITEVERIFY_URL: Final = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


class SiteverifyResult(BaseModel):
    success: bool
    error_codes: list[str] = Field(default_factory=list, alias="error-codes")
    hostname: str | None = None
    action: str | None = None


class TurnstileClient:
    def __init__(self, secret: str, timeout: float = 5):
        self._secret = secret
        self._http = httpx.AsyncClient(timeout=timeout)

    async def siteverify(self, token: str, remote_ip: str | None = None):
        payload = {"secret": self._secret, "response": token}
        if remote_ip is not None:
            payload["remoteip"] = remote_ip

        response = await self._http.post(SITEVERIFY_URL, json=payload)
        response.raise_for_status()
        return SiteverifyResult.model_validate_json(response.content)

    async def close(self):
        await self._http.aclose()
