from aiogram import Bot
from aiogram.client.session.aiohttp import AiohttpSession


def create_bot(token: str, timeout: float = 5):
    return Bot(token, session=AiohttpSession(timeout=timeout))
