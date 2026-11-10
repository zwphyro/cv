import logging

from src.pkg.turnstile.client import TurnstileClient

log = logging.getLogger(__name__)


class TurnstileCaptchaVerifier:
    def __init__(self, client: TurnstileClient):
        self._client = client

    async def verify(self, token: str):
        result = await self._client.siteverify(token)
        if not result.success:
            log.warning("Captcha verification failed: %s", result.error_codes)
        return result.success
