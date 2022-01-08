from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import Integer, String

from apsi_database.models.base import Base


class ReportClass(Base):
  '''Rodzaj zgłoszenia'''
  __tablename__ = "report_classes"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(20), unique=True)
  description = Column(String(400))
