from apsi_database.database import get_db_session
from apsi_database.models import Report
import apsi_database.insert_example

from lambda_parser import object_as_dict

def get_issues():
  """
  Gets all reports from database.
  """
  with get_db_session() as session:
    records = session.query(Report).all()
  records = [object_as_dict(record) for record in records]
  return records