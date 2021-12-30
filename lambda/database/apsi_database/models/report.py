from sqlalchemy import Column, ForeignKey, String, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base
from apsi_database.models.report_keyword import report_keyword_association_table


class Report(Base):
  __tablename__ = "reports"

  id = Column('id', Integer, primary_key=True, index=True)
  creation_date = Column('creation_date', Date)
  end_date = Column('end_date', Date)
  deadline = Column('deadline', Date)

  # Foreign keys
  weight_name = Column(String(15), ForeignKey('weights.name'), index=True)
  status_name = Column(String(15), ForeignKey('statuses.name'), index=True)
  urgency_level = Column(String(1), ForeignKey('urgency_levels.level'), index=True)
  report_class = Column(Integer, ForeignKey('report_classes.id'), index=True)
  bug_id = Column(Integer, ForeignKey('bugs.id'), index=True)
  module_id = Column(Integer, ForeignKey('modules.id'), index=True)
  key_words = relationship("KeyWord", secondary=report_keyword_association_table, back_populates="reports")
  weight = relationship("Weight", back_populates="reports")
  status = relationship("Status", back_populates="reports")
  urgency = relationship("Urgency", back_populates="reports")
  messages = relationship("Message", back_populates="report")
  roles = relationship("Role", back_populates="report")
