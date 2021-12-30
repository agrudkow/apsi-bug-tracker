from sqlalchemy import Column, String
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base


class Module(Base):
  __tablename__ = "modules"

  id = Column('id', Integer, primary_key=True, index=True)
  name = Column('name', String(20), unique=True)
