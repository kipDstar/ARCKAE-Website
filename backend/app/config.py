from functools import lru_cache
from typing import List

from pydantic import AnyHttpUrl, BaseSettings, EmailStr, field_validator


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

    # CORS / Frontend
    cors_origins: List[AnyHttpUrl] = []

    # Email (SMTP)
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_from: EmailStr | None = None
    smtp_use_tls: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: str | List[str]) -> List[str]:
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


@lru_cache
def get_settings() -> Settings:
    return Settings()

