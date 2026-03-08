from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import require_admin_or_counsellor
from ..database import get_db
from ..email_utils import send_email_background
from ..models import ContactFormSubmission, User
from ..schemas import (
    AppointmentUpdate,
    ContactFormCreate,
    ContactFormRead,
)


router = APIRouter(prefix="/api", tags=["contact"])


@router.post("/contact", response_model=ContactFormRead, status_code=status.HTTP_201_CREATED)
def submit_contact_form(
    payload: ContactFormCreate,
    background_tasks: BackgroundTasks,
    db: Annotated[Session, Depends(get_db)],
):
    submission = ContactFormSubmission(
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        intended_destination=payload.intended_destination,
        preferred_course=payload.preferred_course,
        current_education_level=payload.current_education_level,
        message=payload.message,
        appointment_date=payload.appointment_date,
        mode=payload.mode,
    )
    db.add(submission)
    db.flush()
    db.refresh(submission)

    # Fire-and-forget email notifications (optional)
    subject = "New ARCKAE contact / appointment request"
    body = (
        f"New contact submission from {submission.full_name}\n\n"
        f"Email: {submission.email}\n"
        f"Phone: {submission.phone}\n"
        f"Intended destination: {submission.intended_destination}\n"
        f"Preferred course: {submission.preferred_course}\n"
        f"Current education level: {submission.current_education_level}\n"
        f"Appointment date: {submission.appointment_date}\n"
        f"Mode: {submission.mode}\n\n"
        f"Message:\n{submission.message or '-'}\n"
    )
    send_email_background(
        background_tasks,
        subject=subject,
        body=body,
        recipients=["arckae.int@gmail.com"],
    )

    return submission


@router.get(
    "/appointments",
    response_model=List[ContactFormRead],
)
def list_appointments(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(require_admin_or_counsellor)],
    status_filter: str | None = None,
):
    query = db.query(ContactFormSubmission)

    if current_user.role == "counsellor":
        query = query.filter(
            ContactFormSubmission.assigned_counsellor_id == current_user.id
        )

    if status_filter:
        query = query.filter(ContactFormSubmission.status == status_filter)

    return query.order_by(ContactFormSubmission.submitted_at.desc()).all()


@router.put("/appointments/{appointment_id}", response_model=ContactFormRead)
def update_appointment(
    appointment_id: UUID,
    payload: AppointmentUpdate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(require_admin_or_counsellor)],
):
    appointment = (
        db.query(ContactFormSubmission)
        .filter(ContactFormSubmission.id == appointment_id)
        .first()
    )
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )

    if current_user.role == "counsellor":
        # Counsellors can only manage their own appointments
        if appointment.assigned_counsellor_id not in {None, current_user.id}:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not allowed to modify this appointment",
            )

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(appointment, field, value)

    db.flush()
    db.refresh(appointment)
    return appointment

