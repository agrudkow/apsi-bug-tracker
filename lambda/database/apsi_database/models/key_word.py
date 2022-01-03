from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Integer

from apsi_database.models.base import Base
from apsi_database.models.report_keyword import report_keyword_association_table


class KeyWord(Base):
  '''Słowo kluczowe'''
  __tablename__ = "key_words"

  id = Column(Integer, primary_key=True, index=True)
  text = Column(String(40))

  # Foreign keys
  reports = relationship("Report", secondary=report_keyword_association_table, back_populates="key_words")
