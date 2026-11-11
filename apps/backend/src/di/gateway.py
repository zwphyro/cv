from typing import Annotated

from fastapi import BackgroundTasks, Depends

from src.di.infra import BotDep, SettingsDep, TurnstileDep
from src.gateway.background.notifier import BackgroundRequestNotifier
from src.gateway.null.notifier import NullRequestNotifier
from src.gateway.telegram.notifier import TelegramRequestNotifier
from src.gateway.turnstile.captcha import TurnstileCaptchaVerifier
from src.usecase.protocol.captcha import CaptchaVerifier
from src.usecase.protocol.notifier import RequestNotifier


def get_request_notifier(
    bot: BotDep, settings: SettingsDep, tasks: BackgroundTasks
) -> RequestNotifier:
    chat_id = settings.tg_chat_id
    if bot is None or chat_id is None:
        return NullRequestNotifier()
    return BackgroundRequestNotifier(TelegramRequestNotifier(bot, chat_id), tasks)


RequestNotifierDep = Annotated[RequestNotifier, Depends(get_request_notifier)]


def get_captcha_verifier(turnstile: TurnstileDep) -> CaptchaVerifier:
    return TurnstileCaptchaVerifier(turnstile)


CaptchaVerifierDep = Annotated[CaptchaVerifier, Depends(get_captcha_verifier)]
