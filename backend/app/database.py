from urllib.parse import urlparse, urlunparse, parse_qs, urlencode

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from .config import get_settings


settings = get_settings()


def _database_url_with_ssl(url: str) -> str:
    """Ensure non-localhost Postgres URLs use SSL (e.g. Render external URL)."""
    parsed = urlparse(url)
    if "localhost" in parsed.hostname or (parsed.hostname and parsed.hostname.startswith("127.")):
        return url
    query = parse_qs(parsed.query)
    if "sslmode" in query:
        return url
    query["sslmode"] = ["require"]
    new_query = urlencode(query, doseq=True)
    return urlunparse(parsed._replace(query=new_query))


class Base(DeclarativeBase):
    pass


_db_url = _database_url_with_ssl(settings.database_url)
engine = create_engine(_db_url, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db():
    """FastAPI dependency: yields a DB session (Depends injects the yielded value)."""
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

