from functools import lru_cache
from typing import Any, Dict, Optional

from pydantic import BaseSettings
from pydantic import PostgresDsn, validator


class Config(BaseSettings):
    DB_USERNAME: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: str
    DB_NAME: str
    SQLALCHEMY_DB_URI: Optional[PostgresDsn] = None

    @validator("SQLALCHEMY_DB_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("DB_USERNAME"),
            password=values.get("DB_PASSWORD"),
            host=values.get("DB_HOST"),
            port=values.get("DB_PORT"),
            path=f"/{values.get('DB_NAME', '')}",
        )

    class Config:
        env_file = "credentials.env"
        env_file_encoding = 'utf-8'


@lru_cache()
def get_config():
    return Config()
