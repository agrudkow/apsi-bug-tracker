from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base


class Bug(Base):
  __tablename__ = "bugs"

  id = Column('id', Integer, primary_key=True, index=True)
  description = Column('description', String(200))

  # Foreign keys
  parent_bug_id = Column(Integer, ForeignKey('bugs.id'), index=True)
