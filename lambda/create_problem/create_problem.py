from logging import Logger
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from apsi_database.database import get_db_session
from apsi_database.models import (
    Report,
    RelatedUser,
    KeyWord,
    Role,
    ReportClass,
    Bug,
)


@dataclass(frozen=True)
class CreateProblemData:
    description: str
    username: str
    responsiblePerson: str
    observers: str
    ''' Format '%Y-%m-%d' '''
    proposedDeadline: str
    weight: str
    status: str
    urgency: str
    problemType: str
    product: str
    component: Optional[str]
    keywords: str
    relatedProblems: Optional[str]


def create_problem(data: CreateProblemData, logger: Logger) -> int:
    with get_db_session() as session:
        try:
            bug = Bug()
            bug.description = data.description
            bug.parent_bug_id = int(data.relatedProblems) if data.relatedProblems else None
            session.add(bug)
            session.flush()

            report = Report()
            report.creation_date = datetime.now()
            report.updated_date = datetime.now()
            report.end_date = datetime.strptime(data.proposedDeadline, '%Y-%m-%d')
            report.deadline = datetime.strptime(data.proposedDeadline, '%Y-%m-%d')
            report.weight_name = data.weight
            report.status_name = data.status
            report.urgency_level = data.urgency
            report.bug_id = bug.id
            report.product_id = int(data.product) if data.product else None
            report.component_id = int(data.component) if data.component else None
            report.version = 1

            report_class = session.query(ReportClass).filter(ReportClass.name == data.problemType).one()
            report.report_class_id = report_class.id

            for key_word in data.keywords.split(sep=', '):
                db_key_word = session.query(KeyWord).filter(KeyWord.text == key_word).one_or_none()
                if not db_key_word:
                    db_key_word = KeyWord()
                    db_key_word.text = key_word
                    session.add(db_key_word)
                    session.flush()
                report.key_words.append(db_key_word)

            session.add(report)
            session.flush()

            # Get CREATOR role
            creator_role = session.query(Role).filter(Role.description == 'CREATOR').one()
            creator = RelatedUser()
            creator.report_id = report.id
            creator.role_id = creator_role.id
            creator.username = data.username
            session.add(creator)

            # Get RESPONSIBLE_PERSON role
            rp_role = session.query(Role).filter(Role.description == 'RESPONSIBLE_PERSON').one()
            responsible_person = RelatedUser()
            responsible_person.report_id = report.id
            responsible_person.role_id = rp_role.id
            responsible_person.username = data.responsiblePerson
            session.add(responsible_person)

            for observer_username in data.observers.split(sep=', '):
                # Get OBSERVER role
                observer_role = session.query(Role).filter(Role.description == 'OBSERVER').one()
                observer_person = RelatedUser()
                observer_person.report_id = report.id
                observer_person.role_id = observer_role.id
                observer_person.username = observer_username
                session.add(observer_person)

            session.commit()

            return report.id
        except Exception as ex:
            logger.error(str(ex), stack_info=True)
            raise ex
