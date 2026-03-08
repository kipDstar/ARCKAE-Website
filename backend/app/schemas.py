from datetime import date, datetime
from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


# Auth / Users


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[UUID] = None
    role: Optional[str] = None


class StaffGateRequest(BaseModel):
    email: EmailStr
    access_key: str


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(min_length=8)
    role: Literal["admin", "counsellor", "visitor"] = "visitor"


class UserRead(UserBase):
    id: UUID
    role: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Services


class ServiceBase(BaseModel):
    name: str
    category: Literal["main", "auxiliary"]
    icon_url: Optional[str] = None
    short_description: str
    long_description: str


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[Literal["main", "auxiliary"]] = None
    icon_url: Optional[str] = None
    short_description: Optional[str] = None
    long_description: Optional[str] = None


class ServiceRead(ServiceBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# FAQ


class FAQBase(BaseModel):
    question: str
    answer: str
    category: Literal[
        "Getting Started",
        "Admissions",
        "IELTS",
        "Visa & Travel",
        "After Arrival",
    ]


class FAQCreate(FAQBase):
    pass


class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[
        Literal[
            "Getting Started",
            "Admissions",
            "IELTS",
            "Visa & Travel",
            "After Arrival",
        ]
    ] = None


class FAQRead(FAQBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Contact / Appointments


class ContactFormBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    intended_destination: Optional[str] = None
    preferred_course: Optional[str] = None
    current_education_level: Optional[str] = None
    message: Optional[str] = None
    appointment_date: Optional[date] = None
    mode: Optional[Literal["Physical", "Virtual"]] = None


class ContactFormCreate(ContactFormBase):
    pass


class AppointmentUpdate(BaseModel):
    appointment_date: Optional[date] = None
    mode: Optional[Literal["Physical", "Virtual"]] = None
    assigned_counsellor_id: Optional[UUID] = None
    status: Optional[Literal["pending", "confirmed", "completed"]] = None


class ContactFormRead(ContactFormBase):
    id: UUID
    submitted_at: datetime
    assigned_counsellor_id: Optional[UUID] = None
    status: str

    class Config:
        from_attributes = True

