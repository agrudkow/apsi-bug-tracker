import re
from apsi_database.database import get_db_session
from apsi_database.models import Report, Bug, Message


def get_problem_by_id(id: int):
    """
    Return problem by id
    """
    output = {}
    with get_db_session() as session:
        report = session.query(Report).get(id)
        related_bugs = session.query(Bug).filter(Bug.parent_bug_id == report.bug_id).all() # children
        parent_bug = session.query(Bug).filter(Bug.id == report.bug_id).one_or_none() # parent
        related_users = report.related_users
        creator = [related_user for related_user in related_users if related_user.role.description == 'CREATOR'][0]
        responsible_person = [
            related_user for related_user in related_users if related_user.role.description == 'RESPONSIBLE_PERSON'
        ]
        observers = [
            related_user.username for related_user in related_users if related_user.role.description == 'OBSERVER'
        ]
        related_messages = session.query(Message).filter(Message.report_id == report.id)
        gathered_messages = []
        for message in related_messages:
            one_message = []
            one_message.append(str(message.send_date))
            one_message.append(message.username)
            one_message.append(message.text)
            one_message = ' | '.join(element for element in one_message)
            gathered_messages.append(one_message)

        output["problemID"] = str(report.id)
        output["username"] = str(creator.username)
        output["observers"] = ', '.join(observers)
        output["problemType"] = str(report.report_class.name)
        output["weight"] = str(report.weight_name)
        output["urgency"] = str(report.urgency_level)
        output["product"] = str(report.product_id)
        output["component"] = str(report.component.name if report.component else None)
        output["version"] = str(report.version)
        output["keywords"] = ', '.join([key_word.text for key_word in report.key_words])
        output["description"] = str(report.bug.description)
        output["relatedProblems"] = str(parent_bug.parent_bug_id) + "/" + ', '.join([str(bug.report.id) for bug in related_bugs])
        output["proposedDeadline"] = str(report.deadline)
        output["status"] = str(report.status_name)
        output["responsiblePerson"] = str(responsible_person[0].username) if len(responsible_person) == 1 else ''
        output["comments"] = gathered_messages
    return output
