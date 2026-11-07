from fastapi import FastAPI

from src.api import router
from src.exception_registry import ExceptionRegistry
from src.settings import get_settings

settings = get_settings()

app = FastAPI(
    title="Requests API",
    root_path="/api/v1",
)
app.include_router(router)
ExceptionRegistry.apply(app)
