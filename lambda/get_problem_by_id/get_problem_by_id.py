from apsi_database.database import get_db_session
from apsi_database.models import Report, Bug, ReportClass
# import apsi_database.insert_example


def get_problem_by_id(id: str):
  """
    Return problem by id
    """
  output = {}
  with get_db_session() as session:
    report = session.query(Report).get(id)
    related_bugs = session.query(Bug).filter(Bug.parent_bug_id == report.bug_id).all()
    related_users = report.related_users
    creator = [related_user for related_user in related_users if related_user.role.description == 'CREATOR'][0]
    observers = [related_user.username for related_user in related_users if related_user.role.description == 'OBSERVER']
    output["Problem ID"] = str(report.id)
    output["Username"] = str(creator.username)
    output["Observers"] = observers
    output["Problem type"] = str(report.report_class.name)
    output["Weight"] = str(report.weight_name)
    output["Urgency"] = str(report.urgency_level)
    output["Product"] = str(report.product_id)
    output["Component"] = str(report.component.name)
    output["Version"] = str(report.version)
    output["Keywords"] = [key_word.text for key_word in report.key_words]
    output["Description"] = str(report.bug.description)
    output["Related problems"] = [bug.report.id for bug in related_bugs]
    output["Proposed deadline"] = str(report.deadline)
    output["Status"] = str(report.status_name)
    output["Responsible person"] = "Donald Tusk"
  return output
