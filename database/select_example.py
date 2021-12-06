from sqlalchemy import select
from database import *
from model import *

stmt = select(Report).where(Report.id == '1')

session = SessionLocal()

result = session.execute(stmt)
for report_obj in result.scalars():
    print(report_obj.status.meaning)

session.close()
