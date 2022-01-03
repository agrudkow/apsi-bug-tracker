from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from apsi_database.models.base import Base


class Role(Base):
  '''Rola'''
  __tablename__ = "roles"

  id = Column(String(2), primary_key=True, index=True)
  description = Column(String(50))

  # Foreign keys
  related_users = relationship("RelatedUser", back_populates="role")
