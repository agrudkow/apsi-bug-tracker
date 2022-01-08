from sqlalchemy import Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base
from apsi_database.models.report_keyword import report_keyword_association_table


class Report(Base):
  '''Zgłoszenie'''
  __tablename__ = "reports"

  id = Column(Integer, primary_key=True, index=True)
  creation_date = Column(DateTime)
  end_date = Column(DateTime)
  deadline = Column(DateTime)
  version = Column(Integer)

  # Foreign keys
  weight_name = Column(String(15), ForeignKey('weights.name'), index=True)
  status_name = Column(String(15), ForeignKey('statuses.name'), index=True)
  urgency_level = Column(String(1), ForeignKey('urgency_levels.level'), index=True)
  report_class = Column(Integer, ForeignKey('report_classes.id'), index=True)
  bug_id = Column(Integer, ForeignKey('bugs.id'), index=True)
  product_id = Column(Integer, ForeignKey('products.id'), index=True)
  component_id = Column(Integer, ForeignKey('components.id'), index=True)
  key_words = relationship("KeyWord", secondary=report_keyword_association_table, back_populates="reports")
  weight = relationship("Weight", back_populates="reports", uselist=False)
  status = relationship("Status", back_populates="reports", uselist=False)
  urgency = relationship("Urgency", back_populates="reports", uselist=False)
  messages = relationship("Message", back_populates="report")
  related_users = relationship("RelatedUser", back_populates="report")
  bug = relationship("Bug", back_populates="report", uselist=False)
  product = relationship("Product", back_populates="reports", uselist=False)
  component = relationship("Component", back_populates="reports", uselist=False)
