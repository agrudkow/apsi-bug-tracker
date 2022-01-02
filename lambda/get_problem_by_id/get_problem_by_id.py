from apsi_database.database import get_db_session
from apsi_database.models import Report
import apsi_database.insert_example
from apsi_database.models.report_class import ReportClass

def get_problem_by_id(id: str):
    """
    Return problem by id
    """
    output = {}
    with get_db_session() as session:
        report = session.query(Report).get(id)
        report_class = session.query(ReportClass).get(report.report_class)
        output["Problem ID"] = str(report.id)
        output["Username"] = "Ela"
        output["Observers"] = "Ala, Kot"
        output["Problem type"] = str(report.report_class)
        output["Weight"] = str(report.weight_name)
        output["Urgency"] = str(report.urgency_level)
        output["Product"] = str(report.module_id)
        output["Component"] = str(report_class.id)
        output["Version"] = "1.2.1"
        output["Keywords"] = [key_word.text for key_word in report.key_words]
        output["Description"] = str(report_class.description)
        output["Related problems"] = "12, 34"
        output["Proposed deadline"] = str(report.deadline)
        output["Status"] = str(report.status_name)
        output["Responsible person"] = "Donald Tusk"
    return output
