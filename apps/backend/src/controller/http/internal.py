from fastapi import APIRouter

router = APIRouter(prefix="/api/internal", tags=["Internal"])


@router.get("/health", include_in_schema=False)
async def health():
    return {"status": "ok"}
