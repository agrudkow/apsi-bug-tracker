from apsi_database.database import get_db_session
from apsi_database.models import Report, RelatedUser


def get_issues(username: str):
  """
  Gets all reports from database.
  """
  with get_db_session() as session:
    records = session.query(Report).filter(Report.related_users.any(RelatedUser.username==username))
    parsed_records = [{
        'id': record.id,
        'date': str(record.creation_date.date()),
        'type': record.report_class.name,
        'status': record.status_name,
        'description': record.bug.description
    } for record in records]

  return parsed_records
