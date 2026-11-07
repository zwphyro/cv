from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.config.settings import get_settings
from src.controller.http.errors import register_error_handlers
from src.controller.http.internal import router as internal_router
from src.controller.http.v1.router import router
from src.pkg.postgres.database import Database


@asynccontextmanager
async def lifespan(app: FastAPI):
    database = Database(get_settings().db_url)
    app.state.database = database
    yield
    await database.dispose()


def create_app():
    app = FastAPI(title="Requests API", lifespan=lifespan)
    app.include_router(internal_router)
    app.include_router(router)
    register_error_handlers(app)
    return app


app = create_app()
