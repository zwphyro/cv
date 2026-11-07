from fastapi import APIRouter

from src.requests.routes import router as requests_router

router = APIRouter()
router.include_router(requests_router, prefix="/requests", tags=["Requests"])
