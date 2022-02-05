from logging import Logger
from dataclasses import dataclass
from datetime import datetime
from typing import Dict, List, Optional, Tuple

from apsi_database.database import get_db_session
from apsi_database.models import (
    Report,
    RelatedUser,
    KeyWord,
    Role,
    ReportClass,
)


@dataclass(frozen=True)
class UpdateProblemData:
    description: str
    responsiblePerson: str
    observers: str
    proposedDeadline: str
    ''' Format '%Y-%m-%d' '''
    weight: str
    status: str
    urgency: str
    problemType: str
    product: str
    component: Optional[str]
    keywords: str
    relatedProblems: Optional[str]


def update_problem(problem_id: int, data: UpdateProblemData, logger: Logger) -> Tuple[int, List[str]]:
    with get_db_session() as session:
        try:
            report = session.query(Report).get(problem_id)
            bug = report.bug

            bug.description = data.description
            bug.parent_bug_id = int(data.relatedProblems) if data.relatedProblems else None
            session.add(bug)
            session.flush()

            report.end_date = datetime.strptime(data.proposedDeadline, '%Y-%m-%d')
            report.updated_date = datetime.now()
            report.deadline = datetime.strptime(data.proposedDeadline, '%Y-%m-%d')
            report.weight_name = data.weight
            report.status_name = data.status
            report.urgency_level = data.urgency
            report.product_id = int(data.product)
            report.component_id = int(data.component) if data.component else None
            report.version = report.version + 1

            report_class = session.query(ReportClass).filter(ReportClass.name == data.problemType).one()
            report.report_class_id = report_class.id

            new_keywords = []
            for keyword in data.keywords.split(sep=', '):
                db_keyword = session.query(KeyWord).filter(KeyWord.text == keyword).one_or_none()
                if not db_keyword:
                    db_keyword = KeyWord()
                    db_keyword.text = keyword
                    session.add(db_keyword)
                    session.flush()
                new_keywords.append(db_keyword)

            report.key_words = new_keywords

            session.add(report)
            session.flush()

            # Get RESPONSIBLE_PERSON role
            rp_role = session.query(Role).filter(Role.description == 'RESPONSIBLE_PERSON').one()
            responsible_person = session.query(RelatedUser).\
                filter(RelatedUser.report_id == report.id, RelatedUser.role_id == rp_role.id).\
                one_or_none()
            responsible_person = responsible_person if responsible_person else RelatedUser()
            responsible_person.report_id = report.id
            responsible_person.role_id = rp_role.id
            responsible_person.username = data.responsiblePerson
            session.add(responsible_person)

            # Get OBSERVER role
            observer_role = session.query(Role).filter(Role.description == 'OBSERVER').one()
            observers = session.query(RelatedUser).\
                filter(RelatedUser.report_id == report.id, RelatedUser.role_id == observer_role.id).\
                all()
            observers_dict: Dict[str, RelatedUser] = {user.username: user for user in observers}
            observers_update_data = {username: username for username in data.observers.split(sep=', ')}

            for username, observer in observers_dict.items():
                if username not in observers_update_data:
                    logger.debug(f'Deleted observer: {username}')
                    session.delete(observer)
                    session.flush()
                else:
                    del observers_update_data[username]

            for observer_username in observers_update_data.values():
                observer_person = session.query(RelatedUser).\
                    filter(RelatedUser.username == observer_username,
                           RelatedUser.report_id == report.id,
                           RelatedUser.role_id == rp_role.id).\
                    one_or_none()
                observer_person = observer_person if observer_person else RelatedUser()
                observer_person.report_id = report.id
                observer_person.role_id = observer_role.id
                observer_person.username = observer_username
                session.add(observer_person)
                session.flush()

            session.commit()

            observers = session.query(RelatedUser).\
                filter(RelatedUser.report_id == report.id, RelatedUser.role_id == observer_role.id).\
                all()
            email_recipients = [observer.user.email for observer in observers]

            return report.id, email_recipients
        except Exception as ex:
            logger.error(str(ex), stack_info=True)
            raise ex