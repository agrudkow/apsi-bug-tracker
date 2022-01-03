from sqlalchemy import Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base


class Message(Base):
  '''Wiadomość'''
  __tablename__ = "messages"

  send_date = Column(DateTime, primary_key=True, index=True)
  text = Column(String(400))

  # Foreign keys
  report_id = Column(Integer, ForeignKey('reports.id'), primary_key=True)
  username = Column(String(50), ForeignKey('users.username'), primary_key=True, index=True)
  report = relationship("Report", back_populates="messages", uselist=False)
  user = relationship("User", back_populates="messages", uselist=False)
