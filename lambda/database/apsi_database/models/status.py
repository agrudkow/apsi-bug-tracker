from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from apsi_database.models.base import Base


class Status(Base):
  '''Status'''
  __tablename__ = "statuses"

  name = Column(String(15), primary_key=True, index=True)
  description = Column(String(50))

  # Foreign keys
  reports = relationship("Report", back_populates="status")
