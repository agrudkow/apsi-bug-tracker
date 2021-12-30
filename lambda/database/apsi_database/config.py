from functools import lru_cache
from typing import Any, Dict, Optional

from pydantic import BaseSettings
from pydantic import validator


class Config(BaseSettings):
  DB_USERNAME: str
  DB_PASSWORD: str
  DB_HOST: str
  DB_PORT: str
  DB_NAME: str
  SQLALCHEMY_DB_URI: Optional[str] = None

  @validator("SQLALCHEMY_DB_URI", pre=True)
  def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
    if isinstance(v, str):
      return v

    username = values.get("DB_USERNAME")
    password = values.get("DB_PASSWORD")
    host = values.get("DB_HOST")
    name = values.get("DB_NAME")

    if username and password and host and name:
      uri = "mysql+pymysql://" + username + ":" + password + "@" + host + "/" + name
      return uri
    else:
      raise ValueError('DB_USERNAME, DB_PASSWORD, DB_HOST and DB_NAME can not be None')

  class Config:
    env_file = ".env"
    env_file_encoding = 'utf-8'


@lru_cache()
def get_config():
  return Config()

