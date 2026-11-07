from fastapi import FastAPI

from src.controller.http.v1.router import router
from src.exception_registry import ExceptionRegistry
from src.settings import get_settings

settings = get_settings()

app = FastAPI(title="Requests API")
app.include_router(router)
ExceptionRegistry.apply(app)
