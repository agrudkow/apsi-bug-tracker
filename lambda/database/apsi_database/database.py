from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.session import Session

from apsi_database.config import Config, get_config

settings: Config = get_config()

engine = create_engine(settings.SQLALCHEMY_DB_URI)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """
    Getter for sqlalchemy's Session.

    Synchronous (not async) to allow FastAPI calling it on an external thread (from the threadpool).
    Source: https://fastapi.tiangolo.com/async/#sub-dependencies.
    """
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
