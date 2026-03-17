from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .database import Base, SessionLocal, engine
from .models import FAQ, Service, User
from .routers import auth as auth_router
from .routers import contact as contact_router
from .routers import faqs as faqs_router
from .routers import services as services_router


settings = get_settings()


def _maybe_seed() -> None:
    """Run seed.main() once if the database is empty."""
    # Import here to avoid circular imports at module load time
    import seed

    db = SessionLocal()
    try:
        has_service = db.query(Service).first() is not None
        has_faq = db.query(FAQ).first() is not None
        has_admin = db.query(User).filter(User.role == "admin").first() is not None
        # Seed only when the database is completely empty (no services, no FAQs, no admin)
        if not (has_service or has_faq or has_admin):
            seed.main()
    finally:
        db.close()


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name)

    if settings.cors_origins_list:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.cors_origins_list,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    # Create tables (for simple setups; for production consider migrations)
    Base.metadata.create_all(bind=engine)
    _maybe_seed()

    app.include_router(auth_router.router)
    app.include_router(services_router.router)
    app.include_router(faqs_router.router)
    app.include_router(contact_router.router)

    @app.get("/api/health")
    def health_check():
        return {"status": "ok"}

    return app


app = create_app()
