#!/usr/bin/env python3
"""
Seed script for ARCKAE database.
Run this script to populate the database with initial data.
"""

import os
import sys
from pathlib import Path

# Add the backend directory to the Python path so "app" resolves to backend/app
sys.path.insert(0, str(Path(__file__).parent))

from sqlalchemy.orm import Session
from app.database import Base, SessionLocal, engine
from app.models import Service, FAQ, User
from app.auth import get_password_hash


def seed_services(db: Session):
    """Seed services data."""
    services_data = [
        {
            "name": "End-to-End Study Abroad Support",
            "category": "main",
            "icon_url": "/icons/support.svg",
            "short_description": "Complete guidance from application to post-arrival.",
            "long_description": "We guide students through school selection, application, visa, pre-departure and post-arrival orientation."
        },
        {
            "name": "IELTS Training",
            "category": "main",
            "icon_url": "/icons/ielts.svg",
            "short_description": "Prepare for IELTS exams with expert guidance.",
            "long_description": "Tailored IELTS coaching to help students achieve required scores for admission."
        },
        {
            "name": "Career Guidance",
            "category": "main",
            "icon_url": "/icons/career.svg",
            "short_description": "Expert advice on career paths and study choices.",
            "long_description": "Personalized career counseling to help students choose the right courses and universities."
        },
        {
            "name": "School Applications",
            "category": "main",
            "icon_url": "/icons/applications.svg",
            "short_description": "Assistance with university and college applications.",
            "long_description": "Complete application support including document preparation and submission."
        },
        {
            "name": "Visa Application Support",
            "category": "main",
            "icon_url": "/icons/visa.svg",
            "short_description": "Comprehensive visa application assistance.",
            "long_description": "Expert guidance through the entire visa process for study abroad."
        },
        {
            "name": "Pre/Post Departure Orientation",
            "category": "main",
            "icon_url": "/icons/orientation.svg",
            "short_description": "Preparation and support before and after travel.",
            "long_description": "Cultural orientation, travel arrangements, and ongoing support after arrival."
        },
        {
            "name": "Flight Booking Support",
            "category": "auxiliary",
            "icon_url": "/icons/flight.svg",
            "short_description": "Assistance with flight bookings and travel arrangements.",
            "long_description": "Help finding the best flight options and managing travel logistics."
        },
        {
            "name": "Accommodation Booking",
            "category": "auxiliary",
            "icon_url": "/icons/accommodation.svg",
            "short_description": "Support finding suitable accommodation abroad.",
            "long_description": "Assistance with finding and booking student housing, homestays, and apartments."
        },
        {
            "name": "Employment Advisory",
            "category": "auxiliary",
            "icon_url": "/icons/employment.svg",
            "short_description": "Guidance on work opportunities and career development.",
            "long_description": "Advice on part-time work, internships, and post-study employment options."
        },
        {
            "name": "Post-Arrival Support",
            "category": "auxiliary",
            "icon_url": "/icons/post-arrival.svg",
            "short_description": "Ongoing support after arriving in the destination country.",
            "long_description": "Help with settling in, banking, healthcare, and daily life adjustments."
        },
        {
            "name": "Change of Institution",
            "category": "auxiliary",
            "icon_url": "/icons/change.svg",
            "short_description": "Support for changing universities or courses.",
            "long_description": "Assistance with transferring between institutions or changing study programs."
        },
        {
            "name": "Financial Advisory",
            "category": "auxiliary",
            "icon_url": "/icons/finance.svg",
            "short_description": "Guidance on managing finances and funding options.",
            "long_description": "Advice on scholarships, loans, budgeting, and financial planning for study abroad."
        }
    ]

    for service_data in services_data:
        # Check if service already exists
        existing = db.query(Service).filter(Service.name == service_data["name"]).first()
        if not existing:
            service = Service(**service_data)
            db.add(service)
            print(f"Added service: {service_data['name']}")

    db.commit()


def seed_faqs(db: Session):
    """Seed FAQ data."""
    faqs_data = [
        {
            "question": "Is the initial consultation free?",
            "answer": "Yes, ARCKAE provides a free consultation to evaluate student goals and recommend study options.",
            "category": "Getting Started"
        },
        {
            "question": "Can you help with visa applications?",
            "answer": "Yes, we guide students on all required documentation and application procedures to maximize approval chances.",
            "category": "Visa & Travel"
        },
        {
            "question": "What services do you offer?",
            "answer": "We provide end-to-end study abroad support including university selection, application assistance, IELTS training, visa support, accommodation booking, and post-arrival services.",
            "category": "Getting Started"
        },
        {
            "question": "How long does the application process take?",
            "answer": "The process typically takes 3-6 months depending on the university and program. We recommend starting at least 6 months before your intended study start date.",
            "category": "Admissions"
        },
        {
            "question": "Do you help with IELTS preparation?",
            "answer": "Yes, we offer comprehensive IELTS training programs designed to help students achieve the required scores for their chosen universities.",
            "category": "IELTS"
        },
        {
            "question": "What are the costs involved?",
            "answer": "Costs vary depending on the services required. We offer flexible payment plans and can provide detailed quotes during consultation.",
            "category": "Getting Started"
        },
        {
            "question": "Can I work while studying abroad?",
            "answer": "Yes, international students can work part-time during their studies, typically up to 20 hours per week, and full-time during breaks.",
            "category": "After Arrival"
        },
        {
            "question": "Do you provide accommodation assistance?",
            "answer": "Yes, we help students find suitable accommodation including university dormitories, homestays, and private rentals.",
            "category": "After Arrival"
        }
    ]

    for faq_data in faqs_data:
        # Check if FAQ already exists
        existing = db.query(FAQ).filter(FAQ.question == faq_data["question"]).first()
        if not existing:
            faq = FAQ(**faq_data)
            db.add(faq)
            print(f"Added FAQ: {faq_data['question']}")

    db.commit()


def seed_admin_user(db: Session):
    """Create an initial admin user if none exists."""
    existing_admin = db.query(User).filter(User.role == "admin").first()
    if not existing_admin:
        admin = User(
            name="ARCKAE Admin",
            email="admin@arckae.com",
            password_hash=get_password_hash("admin123"),  # Change this in production
            role="admin"
        )
        db.add(admin)
        db.commit()
        print("Created admin user: admin@arckae.com (password: admin123)")
    else:
        print("Admin user already exists")


def main():
    """Main seeding function."""
    print("Seeding ARCKAE database...")

    # Create tables if they don't exist (same as FastAPI app on startup)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        seed_services(db)
        seed_faqs(db)
        seed_admin_user(db)
        print("Seeding completed successfully!")
    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()