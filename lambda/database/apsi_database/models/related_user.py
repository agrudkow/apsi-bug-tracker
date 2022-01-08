from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base


class RelatedUser(Base):
  '''Zainteresowany zgłoszeniem'''
  __tablename__ = "related_users"

  # Foreign keys
  role_id = Column(String(2), ForeignKey('roles.id'), primary_key=True, index=True)
  report_id = Column(Integer, ForeignKey('reports.id'), primary_key=True, index=True)
  username = Column(String(50), ForeignKey('users.username'), primary_key=True)
  role = relationship("Role", back_populates="related_users", uselist=False)
  report = relationship("Report", back_populates="related_users", uselist=False)
  user = relationship("User", back_populates="related_users", uselist=False)
