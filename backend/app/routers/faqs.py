from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import require_admin
from ..database import get_db
from ..models import FAQ
from ..schemas import FAQCreate, FAQRead, FAQUpdate


router = APIRouter(prefix="/api/faqs", tags=["faqs"])


@router.get("", response_model=List[FAQRead])
def list_faqs(
    db: Annotated[Session, Depends(get_db)],
):
    faqs = db.query(FAQ).order_by(FAQ.created_at.asc()).all()
    return faqs


@router.post("", response_model=FAQRead, status_code=status.HTTP_201_CREATED)
def create_faq(
    payload: FAQCreate,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[None, Depends(require_admin)],
):
    faq = FAQ(
        question=payload.question,
        answer=payload.answer,
        category=payload.category,
    )
    db.add(faq)
    db.flush()
    db.refresh(faq)
    return faq


@router.put("/{faq_id}", response_model=FAQRead)
def update_faq(
    faq_id: str,
    payload: FAQUpdate,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[None, Depends(require_admin)],
):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="FAQ not found",
        )

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(faq, field, value)
    db.flush()
    db.refresh(faq)
    return faq


@router.delete("/{faq_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_faq(
    faq_id: str,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[None, Depends(require_admin)],
):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="FAQ not found",
        )
    db.delete(faq)
    return None

