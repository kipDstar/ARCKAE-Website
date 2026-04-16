from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import require_admin
from ..database import get_db
from ..models import Service
from ..schemas import ServiceCreate, ServiceRead, ServiceUpdate


router = APIRouter(tags=["services"])


@router.get("", response_model=List[ServiceRead])
def list_services(
    db: Annotated[Session, Depends(get_db)],
):
    services = db.query(Service).order_by(Service.created_at.asc()).all()
    return services


@router.post("", response_model=ServiceRead, status_code=status.HTTP_201_CREATED)
def create_service(
    payload: ServiceCreate,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[None, Depends(require_admin)],
):
    service = Service(
        name=payload.name,
        category=payload.category,
        icon_url=payload.icon_url,
        short_description=payload.short_description,
        long_description=payload.long_description,
    )
    db.add(service)
    db.flush()
    db.refresh(service)
    return service


@router.put("/{service_id}", response_model=ServiceRead)
def update_service(
    service_id: UUID,
    payload: ServiceUpdate,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[None, Depends(require_admin)],
):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found",
        )

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(service, field, value)
    db.flush()
    db.refresh(service)
    return service


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    service_id: UUID,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[None, Depends(require_admin)],
):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found",
        )
    db.delete(service)
    return None

