import logging
from typing import Final

import httpx

from src.entity.errors import CaptchaUnavailableError
from src.pkg.turnstile.client import TurnstileClient

log = logging.getLogger(__name__)

SECRET_ERROR_CODES: Final = frozenset({"missing-input-secret", "invalid-input-secret"})


class TurnstileCaptchaVerifier:
    def __init__(self, client: TurnstileClient):
        self._client = client

    async def verify(self, token: str):
        try:
            result = await self._client.siteverify(token)
        except httpx.HTTPError as exc:
            log.exception("Failed to reach Turnstile")
            raise CaptchaUnavailableError from exc

        if SECRET_ERROR_CODES.intersection(result.error_codes):
            log.error("Turnstile secret key is invalid: %s", result.error_codes)
            raise CaptchaUnavailableError

        if not result.success:
            log.warning("Captcha verification failed: %s", result.error_codes)
        return result.success
