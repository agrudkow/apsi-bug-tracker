from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from apsi_database.models.base import Base


class User(Base):
  __tablename__ = "users"

  username = Column('username', String(50), primary_key=True, index=True)
  name = Column('name', String(50))
  surname = Column('surname', String(50))
  email = Column('email', String(100), unique=True)
  phone = Column('phone', String(12), unique=True)
  worker = Column('worker', String(1))
  messages = relationship("Message", back_populates="user")
  roles = relationship("Role", back_populates="user")
