from contextlib import contextmanager
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


@contextmanager
def get_db_session() -> Generator[Session, None, None]:
  session: Session = SessionLocal()
  try:
    yield session
  finally:
    session.close()
