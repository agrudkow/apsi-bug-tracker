from sqlalchemy import select

from apsi_database.database import SessionLocal
from apsi_database.model import Report

stmt = select(Report).where(Report.id == '1')

session = SessionLocal()
try:
    result = session.execute(stmt)
    for report_obj in result.scalars():
        print(report_obj.status.meaning)
except:
    print("Can not execute statement.")
finally:
    session.close()
