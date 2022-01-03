from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from apsi_database.models.base import Base


class Component(Base):
  '''Komponent'''
  __tablename__ = "components"

  id = Column(Integer, primary_key=True)
  name = Column(String(50), index=True)
  description = Column(String(50))

  # Foreign keys
  product_id = Column(Integer, ForeignKey('products.id'), index=True)
  product = relationship("Product", back_populates="components", uselist=False)
  reports = relationship("Report", back_populates="component")
