from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .database import Base, SessionLocal, engine
from .models import FAQ, Service, User
from .routers import auth as auth_router, contact as contact_router, faqs as faqs_router, services as services_router

settings = get_settings()

def _maybe_seed() -> None:
    import seed
    from sqlalchemy.orm import Session
    db: Session = SessionLocal()
    try:
        has_service = db.query(Service).first() is not None # pyright: ignore[reportUnknownMemberType]
        if not has_service:
            seed.main()
    finally:
        db.close()

def create_app() -> FastAPI:
    # Set Swagger UI and OpenAPI URLs to be under /api
    app = FastAPI(
        title=settings.app_name,
        docs_url="/api/docs",
        openapi_url="/api/openapi.json"
    )

    if settings.cors_origins_list:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.cors_origins_list,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    Base.metadata.create_all(bind=engine)
    _maybe_seed()

    # Prefix your routers to match the Nginx location block
    app.include_router(auth_router.router, prefix="/api/auth", tags=["Auth"])
    app.include_router(services_router.router, prefix="/api/services", tags=["Services"])
    app.include_router(faqs_router.router, prefix="/api/faqs", tags=["FAQs"])
    app.include_router(contact_router.router, prefix="/api/contact", tags=["Contact"])

    @app.get("/api/health")
    def health_check():
        return {"status": "ok", "app": settings.app_name}

    return app

app = create_app()