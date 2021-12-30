from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base


class Role(Base):
  __tablename__ = "roles"

  role = Column('role', String(1), index=True)

  # Foreign keys
  report_id = Column(Integer, ForeignKey('reports.id'), primary_key=True, index=True)
  username = Column(String(50), ForeignKey('users.username'), primary_key=True)
  report = relationship("Report", back_populates="roles")
  user = relationship("User", back_populates="roles")
