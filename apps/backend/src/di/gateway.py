from typing import Annotated

from fastapi import Depends

from src.di.infra import BotDep, SettingsDep
from src.gateway.null.request import NullRequestNotifier
from src.gateway.telegram.request import TelegramRequestNotifier
from src.usecase.protocol.notifier import RequestNotifier


def get_request_notifier(bot: BotDep, settings: SettingsDep) -> RequestNotifier:
    chat_id = settings.tg_chat_id
    if bot is None or chat_id is None:
        return NullRequestNotifier()
    return TelegramRequestNotifier(bot, chat_id)


RequestNotifierDep = Annotated[RequestNotifier, Depends(get_request_notifier)]
