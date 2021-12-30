from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from apsi_database.models.base import Base


class Status(Base):
  __tablename__ = "statuses"

  name = Column('name', String(15), primary_key=True, index=True)
  meaning = Column('meaning', String(50))

  # Foreign keys
  reports = relationship("Report", back_populates="status")
