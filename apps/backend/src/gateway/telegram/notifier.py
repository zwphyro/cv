from aiogram import Bot
from aiogram.utils.formatting import Bold, Code, as_key_value, as_list

from src.entity.request import Request

MESSAGE_PREVIEW_LENGTH = 1000


class TelegramRequestNotifier:
    def __init__(self, bot: Bot, chat_id: int):
        self._bot = bot
        self._chat_id = chat_id

    async def request_created(self, request: Request):
        message = request.message
        if len(message) > MESSAGE_PREVIEW_LENGTH:
            message = message[:MESSAGE_PREVIEW_LENGTH] + "…"

        content = as_list(
            Bold("New request"),
            as_key_value("ID", Code(str(request.id))),
            as_key_value("Author", request.author),
            as_key_value("Email", request.email),
            "",
            message,
        )
        await self._bot.send_message(self._chat_id, **content.as_kwargs())
