from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base


class Product(Base):
  '''Produkt'''
  __tablename__ = "products"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(20), unique=True)

  # Foreign keys
  reports = relationship("Report", back_populates="product")
  components = relationship("Component", back_populates="product")
