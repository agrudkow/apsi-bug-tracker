from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import Integer, String

from apsi_database.models.base import Base


class ReportClass(Base):
  __tablename__ = "report_classes"

  id = Column('id', Integer, primary_key=True, index=True)
  name = Column('name', String(20), unique=True)
  description = Column('description', String(400))
