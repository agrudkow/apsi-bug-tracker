from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship

from apsi_database.models.base import Base


class User(Base):
  '''Użytkownik'''
  __tablename__ = "users"

  username = Column(String(50), primary_key=True, index=True)
  name = Column(String(50))
  surname = Column(String(50))
  email = Column(String(100), unique=True)
  phone = Column(String(12), unique=True)
  worker = Column(Boolean)
  messages = relationship("Message", back_populates="user")
  related_users = relationship("RelatedUser", back_populates="user")
