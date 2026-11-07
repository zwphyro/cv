from fastapi import APIRouter, status

from src.controller.http.errors import error_responses
from src.controller.http.v1.dto.request import (
    CreateRequestRequest,
    RequestSchema,
    UpdateRequestRequest,
)
from src.di.usecase import RequestUsecaseDep
from src.entity.errors import RequestNotFoundError

router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=RequestSchema)
async def create_request(
    new_request: CreateRequestRequest,
    usecase: RequestUsecaseDep,
):
    return await usecase.create_request(
        author=new_request.author,
        email=new_request.email,
        message=new_request.message,
    )


@router.get(
    "/{id}",
    response_model=RequestSchema,
    responses=error_responses(RequestNotFoundError),
)
async def get_requests(id: str, usecase: RequestUsecaseDep):
    return await usecase.get_request(id)


@router.get("/", response_model=list[RequestSchema])
async def list_requests(usecase: RequestUsecaseDep):
    return await usecase.list_requests()


@router.put(
    "/{id}",
    response_model=RequestSchema,
    responses=error_responses(RequestNotFoundError),
)
async def replace_request(
    id: str,
    new_request: CreateRequestRequest,
    usecase: RequestUsecaseDep,
):
    return await usecase.replace_request(
        id,
        author=new_request.author,
        email=new_request.email,
        message=new_request.message,
    )


@router.patch(
    "/{id}",
    response_model=RequestSchema,
    responses=error_responses(RequestNotFoundError),
)
async def update_request(
    id: str, new_request: UpdateRequestRequest, usecase: RequestUsecaseDep
):
    return await usecase.update_request(
        id, **new_request.model_dump(exclude_unset=True)
    )


@router.delete(
    "/{id}",
    response_model=RequestSchema,
    responses=error_responses(RequestNotFoundError),
)
async def delete_request(id: str, usecase: RequestUsecaseDep):
    return await usecase.delete_request(id)
