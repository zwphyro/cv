from fastapi import APIRouter, status

from src.requests.dependencies import ServiceDependency
from src.requests.schemas import (
    CreateRequestRequest,
    RequestSchema,
    UpdateRequestRequest,
)
from src.schemas import HTTPExceptionSchema

router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=RequestSchema)
async def create_news_post(
    new_request: CreateRequestRequest,
    service: ServiceDependency,
):
    return await service.create_request(
        author=new_request.author,
        email=new_request.email,
        message=new_request.message,
    )


@router.get(
    "/{id}",
    response_model=RequestSchema,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": HTTPExceptionSchema},
    },
)
async def get_requests(id: str, service: ServiceDependency):
    return await service.get_request(id)


@router.get("/", response_model=list[RequestSchema])
async def list_requests(service: ServiceDependency):
    return await service.list_requests()


@router.put(
    "/{id}",
    response_model=RequestSchema,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": HTTPExceptionSchema},
    },
)
async def replace_request(
    id: str,
    new_request: CreateRequestRequest,
    service: ServiceDependency,
):
    return await service.replace_request(
        id,
        author=new_request.author,
        email=new_request.email,
        message=new_request.message,
    )


@router.patch(
    "/{id}",
    response_model=RequestSchema,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": HTTPExceptionSchema},
    },
)
async def update_request(
    id: str, new_news_post: UpdateRequestRequest, service: ServiceDependency
):
    return await service.update_request(
        id, **new_news_post.model_dump(exclude_unset=True)
    )


@router.delete(
    "/{id}",
    response_model=RequestSchema,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": HTTPExceptionSchema},
    },
)
async def delete_news_post(id: str, service: ServiceDependency):
    return await service.delete_request(id)
