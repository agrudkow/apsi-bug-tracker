from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base


class Bug(Base):
  '''Błąd'''
  __tablename__ = "bugs"

  id = Column(Integer, primary_key=True, index=True)
  description = Column(String(200))

  # Foreign keys
  parent_bug_id = Column(Integer, ForeignKey('bugs.id'), index=True)
  report = relationship("Report", back_populates="bug", uselist=False)
