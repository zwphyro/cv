from fastapi import APIRouter

from src.controller.http.v1.request import router as requests_router

router = APIRouter(prefix="/api/v1")
router.include_router(requests_router, prefix="/requests", tags=["Requests"])
