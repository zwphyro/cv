import logging

import httpx

from src.entity.errors import CaptchaUnavailableError
from src.pkg.turnstile.client import TurnstileClient

log = logging.getLogger(__name__)


class TurnstileCaptchaVerifier:
    def __init__(self, client: TurnstileClient):
        self._client = client

    async def verify(self, token: str):
        try:
            result = await self._client.siteverify(token)
        except httpx.HTTPError as exc:
            log.exception("Failed to reach Turnstile")
            raise CaptchaUnavailableError from exc

        if not result.success:
            log.warning("Captcha verification failed: %s", result.error_codes)
        return result.success
