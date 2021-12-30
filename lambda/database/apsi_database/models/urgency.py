from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from apsi_database.models.base import Base


class Urgency(Base):
  __tablename__ = "urgency_levels"

  level = Column('level', String(1), primary_key=True, index=True)
  meaning = Column('meaning', String(50))

  # Foreign keys
  reports = relationship("Report", back_populates="urgency")
