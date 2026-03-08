from functools import lru_cache
from pathlib import Path
from typing import List

from pydantic import EmailStr, computed_field
from pydantic_settings import BaseSettings

# Project root (parent of backend/) so .env is found when running from backend/
_PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    app_name: str = "ARCKAE Study Abroad API"

    # Database
    database_url: str = (
        "postgresql+psycopg://postgres:postgres@localhost:5432/arckae"
    )

    # Auth
    jwt_secret_key: str = "change_me_in_production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # CORS / Frontend (comma-separated string in .env, e.g. http://localhost:5173,http://127.0.0.1:5173)
    cors_origins: str = ""

    # Email (SMTP)
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_from: EmailStr | None = None
    smtp_use_tls: bool = True

    # Staff access gate
    staff_access_key: str | None = None

    class Config:
        env_file = str(_PROJECT_ROOT / ".env")
        env_file_encoding = "utf-8"
        case_sensitive = False  # so DATABASE_URL in .env maps to database_url
        extra = "ignore"  # ignore unknown keys in .env (e.g. comments or future vars)

    @computed_field
    @property
    def cors_origins_list(self) -> List[str]:
        """Parsed CORS origins for middleware (comma-separated string from env)."""
        if not self.cors_origins:
            return []
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()

